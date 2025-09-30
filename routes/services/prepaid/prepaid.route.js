import {GetPrepaidOptByBillerID,GetPrepaidOperatortList,ValidatePrepaidOperator,PrepaidOperatorConfig,createPrepaidPayment} from "../../../controllers/services/prepaid/prepaid.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_prepaid_byid/:billerId:
 *   get:
 *     summary: Get Prepaid By Id
 *     tags: [Prepaid Apis]
 *     responses:
 *       200:
 *         description: Get Prepaid By Id Successfully!
 */
router.route('/get_prepaid_byid/:billerId').get(verifyToken,GetPrepaidOptByBillerID);

/**
 * @swagger
 * /prepaid_list:
 *   get:
 *     summary: Get Prepaid List
 *     tags: [Prepaid Apis]
 *     responses:
 *       200:
 *         description: Get Prepaid List Successfully!
 */
router.route('/prepaid_list').get(verifyToken,GetPrepaidOperatortList);

/**
 * @swagger
 * /prepaid_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Prepaid Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/prepaid_opt/:billerId').get(verifyToken,PrepaidOperatorConfig);

/**
 * @swagger
 * /validate_prepaid/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Prepaid Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_prepaid/:billerId').post(verifyToken,ValidatePrepaidOperator);

/**
 * @swagger
 * /create_prepaid_payment:
 *   post:
 *     summary: Create Prepaid Payment
 *     tags: [Prepaid Apis]
 *     responses:
 *       200:
 *         description: Create Prepaid Payment Successfully!
 */
router.route('/create_prepaid_payment').post(verifyToken, createPrepaidPayment);
export default router;



