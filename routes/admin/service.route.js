import {
CreateService,
GetServiceList,
GetServiceById,
DeleteService,
UpdateServiceStatus,
UpdateService,
AllowServicePermission,
removeServicePermission,
UserNameList,
GetUsersAllowedServices
} from "../../controllers/admin/service.controller.js";
import {verifyToken} from "../../middleware/verifyToken.js";

import express from "express";
const router=express.Router();


/**
 * @swagger
 * /create_service:
 *   post:
 *     summary: Create Service
 *     tags: [Service Apis]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               allowedUsers:
 *                 type: objectid
 *     responses:
 *       200:
 *         description: Service Created Successfully!
 */

router.route('/create_service').post(verifyToken,CreateService);

/**
 * @swagger
 * /get_service_list:
 *   get:
 *     summary: Get Service List
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Get Service List Successfully!
 */
router.route('/get_service_list').get(verifyToken,GetServiceList);

/**
 * @swagger
 * /get_service_byid/:id:
 *   get:
 *     summary: Get Service By Id
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Get Service By Id Successfully!
 */
router.route('/get_service_byid/:id').get(verifyToken,GetServiceById);

/**
 * @swagger
 * /delete_service/:id:
 *   delete:
 *     summary: Delete Service
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Service Deleted Successfully!
 */
router.route('/delete_service/:id').delete(verifyToken,DeleteService);

/**
 * @swagger
 * /update_service_status/:id:
 *   patch:
 *     summary: Update Service Status
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Service Status Updated Successfully!
 */
router.route('/update_service_status/:id').patch(verifyToken,UpdateServiceStatus);

/**
 * @swagger
 * /update_service/:id:
 *   patch:
 *     summary: Update Service
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Service Updated Successfully!
 */
router.route('/update_service/:id').patch(verifyToken,UpdateService);

/**
 * @swagger
 * /allow_service_permission/:id:
 *   post:
 *     summary: Allow Service Permission
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Allow Service Permission To User Successfully!
 */
router.route('/allow_service_permission/:id').post(verifyToken,AllowServicePermission);
/**
 * @swagger
 * /remove_service_permission/:serviceid/:userid:
 *   get:
 *     summary: Remove Service Permission
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Remove Service Permission To User Successfully!
 */
router.route('/remove_service_permission/:serviceid/:userid').get(verifyToken,removeServicePermission);

/**
 * @swagger
 * /get_allowed_user_username:
 *   get:
 *     summary: Allow Users Name List
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Allow Service Users Name List Fetched Successfully!
 */
router.route('/get_allowed_user_username').get(verifyToken,UserNameList);


/**
 * @swagger
 * /get_user_service_list/:id:
 *   get:
 *     summary: Get Users Service List
 *     tags: [Service Apis]
 *     responses:
 *       200:
 *         description: Get Users Service List Successfully!
 */
router.route('/get_user_service_list/:id').get(verifyToken,GetUsersAllowedServices)




export default router;