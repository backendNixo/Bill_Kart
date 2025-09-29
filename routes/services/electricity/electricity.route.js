import {GetElectricityOptByBillerID,GetElectricityOperatortList,ValidateElectricityOperator,ElectricityOperatorConfig,createElectricityPayment} from "../../../controllers/services/electricity/electricity.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";



/**
 * @swagger
 * /get_electricity_byid/:billerId:
 *   get:
 *     summary: Get Electricity By Id
 *     tags: [Electricity Apis]
 *     responses:
 *       200:
 *         description: Get Electricity By Id Successfully!
 */
router.route('/get_electricity_byid/:billerId').get(verifyToken,GetElectricityOptByBillerID);

/**
 * @swagger
 * /electricity_list:
 *   get:
 *     summary: Get Electricity List
 *     tags: [Electricity Apis]
 *     responses:
 *       200:
 *         description: Get Electricity List Successfully!
 */
router.route('/electricity_list').get(verifyToken,GetElectricityOperatortList);

/**
 * @swagger
 * /electricity_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Electricity Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/electricity_opt/:billerId').get(verifyToken,ElectricityOperatorConfig);

/**
 * @swagger
 * /validate_electricity/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Electricity Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_electricity/:billerId').post(verifyToken,ValidateElectricityOperator);

/**
 * @swagger
 * /create_electricity_payment:
 *   post:
 *     summary: Create Electricity Payment
 *     tags: [Electricity Apis]
 *     responses:
 *       200:
 *         description: Create Electricity Successfully!
 */
router.route('/create_electricity_payment').post(verifyToken, createElectricityPayment);
export default router;