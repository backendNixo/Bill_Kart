
import express from "express";
import {
  register,
  login,
  Getdata,
} from "../controllers/user/auth.controller.js";
import { verifyChecksum, verifyUserAgent } from "../middleware/test.middleware.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/register", verifyChecksum, register);
router.post("/login", verifyUserAgent, verifyChecksum, login);
router.get("/getdata/:username",verifyToken, verifyUserAgent, verifyChecksum, Getdata);

export default router;
