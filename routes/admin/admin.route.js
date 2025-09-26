import {
    Login,
    UpdatePassowrd,
    UpdateAdminProfile,
    GetAdminProfile,
    GetUsersList,
    GetUserById,
    UpdateUserPassword,
    DeleteUser,
    UpdateUserStatus,
    BlockUser,
    DeletedUser,
    GetAllUserNameList,
    CreateUser,
    ViewUserLedgerByAdmin
} from "../../controllers/admin/auth.controller.js";
import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { verifyChecksum, verifyUserAgent, encryptMiddleware, decryptMiddleware } from "../../middleware/test.middleware.js";

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
 *   patch:
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
 *   patch:
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
 *   get:
 *     summary: Get Admin Profile
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: Admin Profile Fetched Successfully!
 */

router.route('/get_profile').get(verifyToken, decryptMiddleware, GetAdminProfile);

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

router.route('/get_users_list').get(verifyToken, decryptMiddleware, GetUsersList);

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

router.route('/get_user_byid/:id').get(verifyToken, decryptMiddleware, GetUserById);

/**
 * @swagger
 * /update_user_password/:id:
 *   patch:
 *     summary: Update User Password
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Password Updated Successfully!
 */

router.route('/update_user_password/:id').patch(verifyToken, UpdateUserPassword);

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

router.route('/delete_user/:id').delete(verifyToken, DeleteUser);


/**
 * @swagger
 * /update_user_status/:id:
 *   patch:
 *     summary: Update User Status
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Status Updated Successfully!
 */

router.route('/update_user_status/:id').patch(verifyToken, UpdateUserStatus);

/**
 * @swagger
 * /block_user/:id:
 *   patch:
 *     summary: Block User
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Blocked Updated Successfully!
 */

router.route('/block_user/:id').patch(verifyToken, BlockUser);

/**
 * @swagger
 * /update_user_delete/:id:
 *   patch:
 *     summary: User Delete Status Update
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: User Delete Status Updated Successfully!
 */

router.route('/update_user_delete/:id').patch(verifyToken, DeletedUser);

/**
 * @swagger
 * /get_all_users_name_list:
 *   get:
 *     summary: Get Users Name List
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: Users Name List Fetched Successfully!
 */

router.route('/get_all_users_name_list').get(verifyToken,GetAllUserNameList);


/**
 * @swagger
 * /create_user:
 *   post:
 *     summary: Create User
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
 *               userName:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               status:
 *                 type: boolean
 *               block:
 *                 type: boolean
 *               deleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User Created Successfully!
 */
router.route('/create_user').post(verifyToken,CreateUser);

/**
 * @swagger
 * /view_users_ledgers_list:
 *   get:
 *     summary: Get Users Ledgers List
 *     tags: [Admin Auth Apis]
 *     responses:
 *       200:
 *         description: Users Ledgers List Fetched Successfully!
 */
router.route('/view_users_ledgers_list').get(verifyToken,ViewUserLedgerByAdmin);


export default router;