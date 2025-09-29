import {GetGasOptByBillerID,GetGasOperatortList,ValidateGasOperator,GasOperatorConfig,createGasPayment} from "../../../controllers/services/gas/gas.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_gas_byid/:billerId:
 *   get:
 *     summary: Get Gas By Id
 *     tags: [Gas Apis]
 *     responses:
 *       200:
 *         description: Get Gas By Id Successfully!
 */
router.route('/get_gas_byid/:billerId').get(verifyToken,GetGasOptByBillerID);

/**
 * @swagger
 * /gas_list:
 *   get:
 *     summary: Get Gas List
 *     tags: [Gas Apis]
 *     responses:
 *       200:
 *         description: Get Gas List Successfully!
 */
router.route('/gas_list').get(verifyToken,GetGasOperatortList);

/**
 * @swagger
 * /gas_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Gas Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/gas_opt/:billerId').get(verifyToken,GasOperatorConfig);

/**
 * @swagger
 * /validate_gas/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Gas Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_gas/:billerId').post(verifyToken,ValidateGasOperator);

/**
 * @swagger
 * /create_gas_payment:
 *   post:
 *     summary: Create Gas Payment
 *     tags: [Gas Apis]
 *     responses:
 *       200:
 *         description: Create Gas Successfully!
 */
router.route('/create_gas_payment').post(verifyToken, createGasPayment);
export default router;