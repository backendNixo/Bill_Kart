import { Login, UpdatePassowrd, UpdateAdminProfile, GetAdminProfile } from "../../controllers/admin/auth.controller.js";
import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js"
const router = express.Router();


/**
 * @swagger
 * /login_admin:
 *   post:
 *     summary: Login Admin
 *     tags: [Admin Auth Apis]
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
 *     responses:
 *       200:
 *         description: Admin Login Successfully!
 */
router.route('/login_admin').post(Login);
/**
 * @swagger
 * /update_password:
 *   post:
 *     summary: Update Admin Password
 *     tags: [Admin Auth Apis]
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
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin Password Updated Successfully!
 */
router.route('/update_password').patch(verifyToken, UpdatePassowrd);
/**
 * @swagger
 * /update_admin_profile:
 *   post:
 *     summary: Update Admin Profile
 *     tags: [Admin Auth Apis]
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
 *     responses:
 *       200:
 *         description: Admin Profile Updated Successfully!
 */
router.route('/update_admin_profile').patch(verifyToken, UpdateAdminProfile);

/**
 * @swagger
 * /get_profile:
 *   post:
 *     summary: Get Admin Profile
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: Admin Profile Fetched Successfully!
 */
router.route('/get_profile').get(verifyToken, GetAdminProfile);
export default router;