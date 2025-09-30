import {GetPostpaidOptByBillerID,GetPostpaidOperatortList,ValidatePostpaidOperator,PostpaidOperatorConfig,createPostpaidPayment} from "../../../controllers/services/postpaid/postpaid.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";



/**
 * @swagger
 * /get_postpaid_byid/:billerId:
 *   get:
 *     summary: Get Postpaid By Id
 *     tags: [Postpaid Apis]
 *     responses:
 *       200:
 *         description: Get Postpaid By Id Successfully!
 */
router.route('/get_postpaid_byid/:billerId').get(verifyToken,GetPostpaidOptByBillerID);

/**
 * @swagger
 * /postpaid_list:
 *   get:
 *     summary: Get Postpaid List
 *     tags: [Postpaid Apis]
 *     responses:
 *       200:
 *         description: Get Postpaid List Successfully!
 */
router.route('/postpaid_list').get(verifyToken,GetPostpaidOperatortList);

/**
 * @swagger
 * /postpaid_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Postpaid Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/postpaid_opt/:billerId').get(verifyToken,PostpaidOperatorConfig);

/**
 * @swagger
 * /validate_postpaid/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Postpaid Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_postpaid/:billerId').post(verifyToken,ValidatePostpaidOperator);

/**
 * @swagger
 * /create_postpaid_payment:
 *   post:
 *     summary: Create Postpaid Payment
 *     tags: [Postpaid Apis]
 *     responses:
 *       200:
 *         description: Create Postpaid Payment Successfully!
 */
router.route('/create_postpaid_payment').post(verifyToken, createPostpaidPayment);

export default router;




