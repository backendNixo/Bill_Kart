import{
    CreateNotification,
    DeleteNotification,
    UpdateNotification,
    GetNotificationList,
    GetNotificationBasedOnType,
    SendNotificationToUser,
    IsNotificationRead
} from "../../controllers/admin/notification.controller.js";

import {verifyToken} from "../../middleware/verifyToken.js";
import express from "express";

const router=express.Router();

/**
 * @swagger
 * /create_notification:
 *   post:
 *     summary: Create Notification
 *     tags: [Notification Apis]
 *     parameters:
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: tru
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               header:
 *                 type: string
 *               body:
 *                 type: string
 *               notificationFor:
 *                 type: string
 *               isSeen:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Notification Created Successfully!
 */
router.route('/create_notification').post(verifyToken,CreateNotification);

/**
 * @swagger
 * /delete_notification/:id:
 *   delete:
 *     summary: Delete Notification
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Notification Deleted Successfully!
 */
router.route('/delete_notification/:id').delete(verifyToken,DeleteNotification);

/**
 * @swagger
 * /update_notification/:id:
 *   patch:
 *     summary: Update Notification
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Notification Updated Successfully!
 */
router.route('/update_notification/:id').patch(verifyToken,UpdateNotification);

/**
 * @swagger
 * /get_notification_list:
 *   get:
 *     summary: Get Notification List
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Get Notification List Successfully!
 */
router.route('/get_notification_list').get(verifyToken,GetNotificationList); 

/**
 * @swagger
 * /notification_list_based_on_type:
 *   post:
 *     summary: Get Notification List Based On Type
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Get Notification List Successfully!
 */
router.route('/notification_list_based_on_type').post(verifyToken,GetNotificationBasedOnType);

/**
 * @swagger
 * /send_notification_to_user/:id:
 *   post:
 *     summary: Send Notification 
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Send Notification  Successfully!
 */
router.route('/send_notification_to_user/:id').post(verifyToken,SendNotificationToUser);

/**
 * @swagger
 * /notification_seen/:id:
 *   patch:
 *     summary: Notification Read
 *     tags: [Notification Apis]
 *     responses:
 *       200:
 *         description: Notification Read Successfully!
 */
router.route('/notification_seen/:id').patch(verifyToken,IsNotificationRead);

export default router;