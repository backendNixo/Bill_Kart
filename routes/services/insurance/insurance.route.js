import {GetInsuranceOptByBillerID,GetInsuranceOperatortList,ValidateInsuranceOperator,InsuranceOperatorConfig,createInsurancePayment} from "../../../controllers/services/insurance/insurance.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_insurance_byid/:billerId:
 *   get:
 *     summary: Get Insurance By Id
 *     tags: [Insurance Apis]
 *     responses:
 *       200:
 *         description: Get Insurance By Id Successfully!
 */
router.route('/get_insurance_byid/:billerId').get(verifyToken,GetInsuranceOptByBillerID);

/**
 * @swagger
 * /insurance_list:
 *   get:
 *     summary: Get Insurance List
 *     tags: [Insurance Apis]
 *     responses:
 *       200:
 *         description: Get Insurance List Successfully!
 */
router.route('/insurance_list').get(verifyToken,GetInsuranceOperatortList);

/**
 * @swagger
 * /insurance_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Insurance Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/insurance_opt/:billerId').get(verifyToken,InsuranceOperatorConfig);

/**
 * @swagger
 * /validate_insurance/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Insurance Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_insurance/:billerId').post(verifyToken,ValidateInsuranceOperator);

/**
 * @swagger
 * /create_insurance_payment:
 *   post:
 *     summary: Create Insurance Payment
 *     tags: [Insurance Apis]
 *     responses:
 *       200:
 *         description: Create Insurance Successfully!
 */
router.route('/create_insurance_payment').post(verifyToken, createInsurancePayment);

export default router;