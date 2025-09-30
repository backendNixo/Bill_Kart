import {
    GetLPGOptByBillerID,
    GetLPGOperatortList,
    LPGOperatorConfig,
    ValidateLPGtOperator,
    createLPGPayment
} from "../../../controllers/services/lpg/lpg.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_lpg_byid/:billerId:
 *   get:
 *     summary: Get LPG By Id
 *     tags: [LPG Apis]
 *     responses:
 *       200:
 *         description: Get LPG By Id Successfully!
 */
router.route('/get_lpg_byid/:billerId').get(verifyToken,GetLPGOptByBillerID);

/**
 * @swagger
 * /lpg_list:
 *   get:
 *     summary: Get LPG List
 *     tags: [LPG Apis]
 *     responses:
 *       200:
 *         description: Get LPG List Successfully!
 */
router.route('/lpg_list').get(verifyToken,GetLPGOperatortList);

/**
 * @swagger
 * /lpg_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [LPG Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/lpg_opt/:billerId').get(verifyToken,LPGOperatorConfig);

/**
 * @swagger
 * /validate_lpg/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [LPG Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_lpg/:billerId').post(verifyToken,ValidateLPGtOperator);

/**
 * @swagger
 * /create_lpg_payment:
 *   post:
 *     summary: Create LPG Payment
 *     tags: [LPG Apis]
 *     responses:
 *       200:
 *         description: Create LPG Payment Successfully!
 */
router.route('/create_lpg_payment').post(verifyToken, createLPGPayment);

export default router;