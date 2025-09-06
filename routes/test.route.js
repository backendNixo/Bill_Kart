import express from "express";
import { verifyUserAgent } from "../middleware/test.middleware.js";
import { LoginUser, GetData } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", verifyUserAgent(false), LoginUser);

router.get("/get_data", verifyToken, verifyUserAgent(true), GetData);

export default router;
