import crypto from "crypto";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const HMAC_SECRET = process.env.CHECKSUM_SECRET || "mysecret";
const FILE_SECRET_KEY = crypto.createHash("sha256").update(process.env.FILE_SECRET_KEY).digest();
const IV_LENGTH = 16;

export const checkIpLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 4,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { status: 429, message: "Too many requests, try again later" }
});


export const isMobileUserAgent = (ua = "") => /mobile|android|iphone|ipad|phone/i.test(ua);

export const verifyChecksum = (userAgent, signature) => {
  if (!signature) return false;
  const hmac = crypto.createHmac("sha256", HMAC_SECRET);
  hmac.update(userAgent);
  const hmacContent = hmac.digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const hmacBuffer = Buffer.from(hmacContent, "hex");
    if (sigBuffer.length !== hmacBuffer.length) return false;
    return crypto.timingSafeEqual(hmacBuffer, sigBuffer);
  } catch {
    return false;
  }
};

// export const verifyUserAgent = (requireRoleCheck = false) => (req, res, next) => {
//   try {
//     const clientChecksum = req.headers["x-checksum"];
//     const ua = req.get("user-agent") || "";

//     if (!verifyChecksum(ua, clientChecksum))
//       return res.status(403).json({ message: "Checksum mismatch" });

//     if (requireRoleCheck) {
//       if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//       const isMobile = isMobileUserAgent(ua);
//       if (req.user.role === "admin" && isMobile)
//         return res.status(403).json({ message: "Admin only allowed from web" });
//       if (req.user.role === "user" && !isMobile)
//         return res.status(403).json({ message: "User only allowed from mobile" });
//     }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unknown Agent", error: err.message });
//   }
// }

export const verifyUserAgent = (requireRoleCheck = false) => {
  return (req, res, next) => {
    try {
      const clientChecksum = req.headers["x-checksum"];
      const ua = req.get("user-agent") || "";

      const isValid = verifyChecksum(ua, clientChecksum);
      if (!isValid) {
        return res.status(403).json({ message: "Checksum mismatch" });
      }

      const isMobile = isMobileUserAgent(ua);

      if (requireRoleCheck) {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        if (req.user.role === "admin" && isMobile) {
          return res.status(403).json({ message: "Admin only allowed from web" });
        }

        if (req.user.role === "user" && !isMobile) {
          return res.status(403).json({ message: "User only allowed from mobile" });
        }
      } else {
        if (req.body?.role === "admin" && isMobile) {
          return res.status(403).json({ message: "Admin login only allowed from web" });
        }

        if (req.body?.role === "user" && !isMobile) {
          return res.status(403).json({ message: "User login only allowed from mobile" });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Unknown Agent", error: err.message });
    }
  };
};

export const decryptMiddleware = (req, res, next) => {
  try {
    if (req.body?.data && req.body?.iv) {
      const ivBuffer = Buffer.from(req.body.iv, "hex");
      const decipher = crypto.createDecipheriv("aes-256-cbc", FILE_SECRET_KEY, ivBuffer);

      let decrypted = decipher.update(req.body.data, "hex", "utf8");
      decrypted += decipher.final("utf8");

      req.body = JSON.parse(decrypted);
      console.log("Request auto-decrypted");
    }
    next();
  } catch (err) {
    console.log("Request not encrypted or decryption failed, continuing as plain JSON");
    next();
  }
};

export const encryptMiddleware = (req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv("aes-256-cbc", FILE_SECRET_KEY, iv);

      let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
      encrypted += cipher.final("hex");

      return oldJson.call(this, { data: encrypted, iv: iv.toString("hex") });
    } catch (err) {
      console.log("Encryption failed, sending plain response");
      return oldJson.call(this, data);
    }
  };
  next();
};
