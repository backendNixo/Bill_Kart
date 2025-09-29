
import express from "express";
import {
  login,
  GetProfile,
  UpdatePassowrd,
  verifyOtp,
  completeSetup
} from "../controllers/user/auth.controller.js";
import { verifyChecksum, verifyUserAgent, encryptMiddleware, decryptMiddleware } from "../middleware/test.middleware.js"
import { verifyToken } from "../middleware/verifyToken.js";
import {SetupMiddleware} from "../middleware/isSetup.middleware.js"

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

/**
 * @swagger
 * /verify_otp:
 *   post:
 *     summary: OTP Verified
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: OTP Verified Successfully!
 */
router.route('/verify_otp').post(verifyToken,verifyUserAgent,verifyChecksum,verifyOtp);


/**
 * @swagger
 * /complete_setup:
 *   patch:
 *     summary: Update isSetup
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Update isSetup Successfully!
 */
router.route('/complete_setup').patch(verifyToken,completeSetup);

export default router;
