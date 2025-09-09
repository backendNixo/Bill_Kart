
import express from "express";
import {
  login,
  GetProfile,
} from "../controllers/user/auth.controller.js";
import { verifyChecksum, verifyUserAgent, encryptMiddleware, decryptMiddleware } from "../middleware/test.middleware.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

// router.post("/register", verifyChecksum,encryptMiddleware,register);
router.post("/login", verifyUserAgent, verifyChecksum, login);
router.get("/getdata", verifyToken, verifyUserAgent, verifyChecksum, decryptMiddleware, GetProfile);

export default router;
