import {
CreateApi,
DeleteApi,
UpdateApi,
UpdateActiveStatus,
GetAPIById,
GetAPIList
} from "../../controllers/admin/api.controller.js";
import {verifyToken} from '../../middleware/verifyToken.js';
import express from "express";
const router=express.Router();


/**
 * @swagger
 * /create_api:
 *   post:
 *     summary: Create API
 *     tags: [API Apis]
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
 *               apiUrl:
 *                 type: string
 *               apiGroup:
 *                 type: string
 *               groupName:
 *                 type: string
 *               groupCode:
 *                 type: string
 *               maxLimitPerTran:
 *                 type: number
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *               liveId:
 *                 type: string
 *               errorCode:
 *                 type: string
 *               message:
 *                 type: string
 *               successCode:
 *                 type: string
 *               failedCode:
 *                 type: string
 *               refKey:
 *                 type: string
 *               maxQueue:
 *                 type: number
 *               currQueue:
 *                 type: number
 *               resType:
 *                 type: string
 *               postType:
 *                 type: string
 *               fDelimiter:
 *                 type: string
 *               sDelimiter:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               transactionId:
 *                 type: string
 *       200:
 *         description: API Created Successfully!
 */
router.route('/create_api').post(verifyToken,CreateApi);
/**
 * @swagger
 * /delete_api/:id:
 *   delete:
 *     summary: delete API
 *     tags: [API Apis]
 *     responses:
 *       200:
 *         description: API Deleted Successfully!
 */
router.route('/delete_api/:id').delete(verifyToken,DeleteApi);

/**
 * @swagger
 * /update_api/:id:
 *   patch:
 *     summary: Update API
 *     tags: [API Apis]
 *     responses:
 *       200:
 *         description: API Updated Successfully!
 */

router.route('/update_api/:id').patch(verifyToken,UpdateApi);

/**
 * @swagger
 * /update_api_status/:id:
 *   patch:
 *     summary: Update API Status
 *     tags: [API Apis]
 *     responses:
 *       200:
 *         description: API Status Updated Successfully!
 */


router.route('/update_api_status/:id').patch(verifyToken,UpdateActiveStatus);

/**
 * @swagger
 * /get_api_byid/:id:
 *   get:
 *     summary: Get API ById
 *     tags: [API Apis]
 *     responses:
 *       200:
 *         description: Get API ById Successfully!
 */

router.route('/get_api_byid/:id').get(verifyToken,GetAPIById);

/**
 * @swagger
 * /get_api_list:
 *   get:
 *     summary: API List
 *     tags: [API Apis]
 *     responses:
 *       200:
 *         description: API List Successfully!
 */

router.route('/get_api_list').get(verifyToken,GetAPIList);

export default router;