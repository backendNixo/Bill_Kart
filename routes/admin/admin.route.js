import {
    Login,
    UpdatePassowrd,
    UpdateAdminProfile,
    GetAdminProfile,
    GetUsersList,
    GetUserById,
    UpdateUserPassword,
    DeleteUser
} from "../../controllers/admin/auth.controller.js";
import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { verifyChecksum, verifyUserAgent,encryptMiddleware, decryptMiddleware } from "../../middleware/test.middleware.js";

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

router.route('/login_admin').post(verifyChecksum,verifyUserAgent,decryptMiddleware, Login);

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

router.route('/update_password').patch(verifyToken,verifyChecksum,verifyUserAgent, UpdatePassowrd);

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

router.route('/update_admin_profile').patch(verifyToken,verifyChecksum,verifyUserAgent, UpdateAdminProfile);

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

router.route('/get_profile').get(verifyToken,verifyChecksum,verifyUserAgent, decryptMiddleware, GetAdminProfile);

/**
 * @swagger
 * /get_users_list:
 *   get:
 *     summary: Get User List
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User List Fetched Successfully!
 */

router.route('/get_users_list').get(verifyToken,verifyChecksum,verifyUserAgent,decryptMiddleware,GetUsersList);

/**
 * @swagger
 * /get_user_byid/:id:
 *   get:
 *     summary: Get User BY Id
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Fetched By Id Successfully!
 */

router.route('/get_user_byid/:id').get(verifyToken,verifyChecksum,verifyUserAgent,decryptMiddleware,GetUserById);

/**
 * @swagger
 * /update_user_password/:id:
 *   get:
 *     summary: Update User Password
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Password Updated Successfully!
 */

router.route('/update_user_password/:id').patch(verifyToken,verifyChecksum,verifyUserAgent,UpdateUserPassword);

/**
 * @swagger
 * /delete_user/:id:
 *   delete:
 *     summary: Delete User 
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Deleted Successfully!
 */

router.route('/delete_user/:id').delete(verifyToken,verifyChecksum,verifyUserAgent,DeleteUser);



export default router;