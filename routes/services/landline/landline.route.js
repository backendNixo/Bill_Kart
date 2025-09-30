import {GetLandLineOptByBillerID,GetLandLineOperatortList,ValidateLandLineOperator,LandlineOperatorConfig,createLandlinePayment} from "../../../controllers/services/landline/landline.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_landline_byid/:billerId:
 *   get:
 *     summary: Get Landline By Id
 *     tags: [Landline Apis]
 *     responses:
 *       200:
 *         description: Get Landline By Id Successfully!
 */
router.route('/get_landline_byid/:billerId').get(verifyToken,GetLandLineOptByBillerID);

/**
 * @swagger
 * /landline_list:
 *   get:
 *     summary: Get Landline List
 *     tags: [Landline Apis]
 *     responses:
 *       200:
 *         description: Get Landline List Successfully!
 */
router.route('/landline_list').get(verifyToken,GetLandLineOperatortList);

/**
 * @swagger
 * /landline_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Landline Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/landline_opt/:billerId').get(verifyToken,LandlineOperatorConfig);

/**
 * @swagger
 * /validate_landline/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Landline Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_landline/:billerId').post(verifyToken,ValidateLandLineOperator);

/**
 * @swagger
 * /create_landline_payment:
 *   post:
 *     summary: Create Landline Payment
 *     tags: [Landline Apis]
 *     responses:
 *       200:
 *         description: Create Landline Payment Successfully!
 */
router.route('/create_landline_payment').post(verifyToken, createLandlinePayment);

export default router;

