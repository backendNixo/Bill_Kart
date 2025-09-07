import crypto from "crypto";
import { rateLimit } from "express-rate-limit";
import { generateChecksum } from "../utils/encryption.js";

import dotenv from "dotenv";
dotenv.config();

const FILE_SECRET_KEY = crypto
  .createHash("sha256")
  .update(toString(process.env.FILE_SECRET_KEY))
  .digest();
const IV_LENGTH = 16;

export const checkIpLimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 4,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { status: 429, message: "Too many requests, try again later" },
});

export const decryptMiddleware = (req, res, next) => {
  try {
    if (req.body?.data && req.body?.iv) {
      const ivBuffer = Buffer.from(req.body.iv, "hex");
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        FILE_SECRET_KEY,
        ivBuffer
      );

      let decrypted = decipher.update(req.body.data, "hex", "utf8");
      decrypted += decipher.final("utf8");

      req.body = JSON.parse(decrypted);
      console.log("Request auto-decrypted");
    }
    next();
  } catch (err) {
    console.log(
      "Request not encrypted or decryption failed, continuing as plain JSON"
    );
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

export const verifyChecksum = (req, res, next) => {
  const clientChecksum = req.headers["x-checksum"];
  const userAgent = req.headers["user-agent"];

  if (!clientChecksum) {
    return res.status(400).json({ error: "Checksum header missing" });
  }

  const serverChecksum = generateChecksum(userAgent);
  console.log(clientChecksum, "===", serverChecksum);

  if (clientChecksum !== serverChecksum) {
    return res.status(401).json({ error: "Invalid checksum" });
  }
  console.log("checksume verify");
  next();
};

export const verifyUserAgent = (req, res, next) => {
  const role = req.body.role || req.user?.role;
  const userAgent = req.headers["user-agent"] || "";
  console.log(role, userAgent);

  if (role === "admin" && !userAgent.includes("Web")) {
    console.log("Admins allowed only from web");

    return res.status(403).json({
      error: "Admins allowed only from web",
      msg: "Admins allowed only from web",
    });
  }

  if (role === "user" && !userAgent.includes("Mobile")) {
    console.log("Users allowed only from mobile");

    return res.status(403).json({
      error: "Users allowed only from mobile",
      msg: "Users allowed only from mobile",
    });
  }
  console.log("user agent verify");

  next();
};
