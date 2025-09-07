import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config()


 const encryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", FILE_SECRET_KEY, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => resolve({ file: outputPath, iv: iv.toString("hex") }));
    output.on("error", reject);
  });
};

const decryptFile = (inputPath, outputPath, ivHex) => {
  return new Promise((resolve, reject) => {
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", FILE_SECRET_KEY, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => resolve({ file: outputPath }));
    output.on("error", reject);
  });
};

 const generateChecksum = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};


export { encryptFile, decryptFile, generateChecksum };
