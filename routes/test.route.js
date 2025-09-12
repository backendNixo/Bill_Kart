
import express from "express";
import {
  login,
  GetProfile,
  UpdatePassowrd
} from "../controllers/user/auth.controller.js";
import { verifyChecksum, verifyUserAgent, encryptMiddleware, decryptMiddleware } from "../middleware/test.middleware.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     tags: [User Apis]
 *     parameters:
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Login Successfully!
 */
router.route("/login").post(login);

/**
 * @swagger
 * /get_profile:
 *   get:
 *     summary: Login User
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Get User Profile Data Successfully!
 */

router.route("/get_profile").get(verifyToken, verifyUserAgent, verifyChecksum, decryptMiddleware, GetProfile);

/**
 * @swagger
 * /change_password:
 *   patch:
 *     summary: Update User Password
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: User Password Updated Successfully!
 */

router.route("/change_password").patch(verifyToken, verifyUserAgent, verifyChecksum, UpdatePassowrd)

export default router;
