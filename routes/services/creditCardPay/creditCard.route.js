import {GetCreditOptByBillerID,GetCreditOperatortList,ValidateCreditOperator,CreditOperatorConfig,createCreditCardPayment} from "../../../controllers/services/creditCardPay/creditCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_creditcard_byid/:billerId:
 *   get:
 *     summary: Get Credit Card By Id
 *     tags: [Credit Card Apis]
 *     responses:
 *       200:
 *         description: Get Credit Card By Id Successfully!
 */
router.route('/get_creditcard_byid/:billerId').get(verifyToken,GetCreditOptByBillerID)

/**
 * @swagger
 * /creditCard_list:
 *   get:
 *     summary: Get Credit Card List
 *     tags: [Credit Card Apis]
 *     responses:
 *       200:
 *         description: Get Credit Card List Successfully!
 */
router.route('/creditCard_list').get(verifyToken,GetCreditOperatortList);

/**
 * @swagger
 * /credit_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Credit Card Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/credit_opt/:billerId').get(verifyToken,CreditOperatorConfig);

/**
 * @swagger
 * /validate_creditcard/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Credit Card Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_creditcard/:billerId').post(verifyToken,ValidateCreditOperator);

/**
 * @swagger
 * /create_creditcard_payment:
 *   post:
 *     summary: Create Credit Card Payment
 *     tags: [Credit Card Apis]
 *     responses:
 *       200:
 *         description: Create Credit Card Payment Successfully!
 */
router.route('/create_creditcard_payment').post(verifyToken,createCreditCardPayment);


export default router;