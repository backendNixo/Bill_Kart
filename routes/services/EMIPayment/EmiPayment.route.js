import {GetEMIOptByBillerID,GetEMIOperatortList,ValidateEMIPaymentOperator,EMIOperatorConfig,createEMIPayment} from "../../../controllers/services/EMIPayment/EmiPayment.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_emi_byid/:billerId:
 *   get:
 *     summary: Get EMI By Id
 *     tags: [EMI Apis]
 *     responses:
 *       200:
 *         description: Get EMI By Id Successfully!
 */
router.route('/get_emi_byid/:billerId').get(verifyToken,GetEMIOptByBillerID);

/**
 * @swagger
 * /emi_list:
 *   get:
 *     summary: Get EMI List
 *     tags: [EMI Apis]
 *     responses:
 *       200:
 *         description: Get EMI List Successfully!
 */
router.route('/emi_list').get(verifyToken,GetEMIOperatortList);

/**
 * @swagger
 * /emi_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [EMI Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/emi_opt/:billerId').get(verifyToken,EMIOperatorConfig);

/**
 * @swagger
 * /validate_emi/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [EMI Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_emi/:billerId').post(verifyToken,ValidateEMIPaymentOperator);

/**
 * @swagger
 * /create_emi_payment:
 *   post:
 *     summary: Create EMI Payment
 *     tags: [EMI Apis]
 *     responses:
 *       200:
 *         description: Create EMI Successfully!
 */
router.route('/create_emi_payment').post(verifyToken, createEMIPayment);

export default router;