import {
    BroadbandOperatorConfig, 
    GetbroadbandOptByBillerID,
    GetbroadbandOptList,
    ValidateBroadbandOperators,
    createBroadbandPayment
} from "../../../controllers/services/broadband/broadband.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_broadband_byid/:billerId:
 *   get:
 *     summary: Get Broadband By Id
 *     tags: [Broadband Apis]
 *     responses:
 *       200:
 *         description: Get Broadband By Id Successfully!
 */

router.route('/get_broadband_byid/:billerId').get(verifyToken,GetbroadbandOptByBillerID)
/**
 * @swagger
 * /broadband_list:
 *   get:
 *     summary: Broadband List
 *     tags: [Broadband Apis]
 *     responses:
 *       200:
 *         description: Broadband List Fetched Successfully!
 */

router.route('/broadband_list').get(verifyToken,GetbroadbandOptList);

/**
 * @swagger
 * /broadband_opt/:billerId:
 *   get:
 *     summary: Broadband List
 *     tags: [Broadband Apis]
 *     responses:
 *       200:
 *         description: Broadband Operator Config  Successfully!
 */
router.route('/broadband_opt/:billerId').get(verifyToken,BroadbandOperatorConfig);
/**
 * @swagger
 * /broadband_opt/:billerId:
 *   get:
 *     summary: Broadband List
 *     tags: [Broadband Apis]
 *     responses:
 *       200:
 *         description: Broadband Operator Config  Successfully!
 */
router.route('/validate_broadband/:billerId').post(verifyToken,ValidateBroadbandOperators);

/**
 * @swagger
 * /create_broadband_payment:
 *   get:
 *     summary: Create Broadband Payment
 *     tags: [Broadband Apis]
 *     responses:
 *       200:
 *         description: Broadband Payment  Successfully!
 */
router.route('/create_broadband_payment').post(verifyToken,createBroadbandPayment);

export default router;