import {
    GetFastagOptByBillerID,
    GetFastagOperatortList,
    FastagOperatorConfig,
    ValidateFastagOperator,
    createFastagPayment
} from "../../../controllers/services/fastag/fastag.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_fastag_byid/:billerId:
 *   get:
 *     summary: Get FASTAG By Id
 *     tags: [FASTAG Apis]
 *     responses:
 *       200:
 *         description: Get FASTAG By Id Successfully!
 */
router.route('/get_fastag_byid/:billerId').get(verifyToken,GetFastagOptByBillerID);

/**
 * @swagger
 * /fastag_list:
 *   get:
 *     summary: Get FASTAG List
 *     tags: [FASTAG Apis]
 *     responses:
 *       200:
 *         description: Get FASTAG List Successfully!
 */
router.route('/fastag_list').get(verifyToken,GetFastagOperatortList);

/**
 * @swagger
 * /fastag_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [FASTAG Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/fastag_opt/:billerId').get(verifyToken,FastagOperatorConfig);


/**
 * @swagger
 * /validate_fastag/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [FASTAG Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_fastag/:billerId').post(verifyToken,ValidateFastagOperator);

/**
 * @swagger
 * /create_fastag_payment:
 *   post:
 *     summary: Create FASTAG Payment
 *     tags: [FASTAG Apis]
 *     responses:
 *       200:
 *         description: Create FASTAG Successfully!
 */
router.route('/create_fastag_payment').post(verifyToken, createFastagPayment);


export default router;