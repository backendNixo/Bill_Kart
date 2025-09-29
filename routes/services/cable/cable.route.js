import {GetCableOptByBillerID,GetCableOperatortList,CableOperatorConfig,ValidateCableOperator,createCablePayment} from "../../../controllers/services/cable/cable.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_cable_byid/:billerId:
 *   get:
 *     summary: Get Cable By Id
 *     tags: [Cable Apis]
 *     responses:
 *       200:
 *         description: Get Cable By Id Successfully!
 */
router.route('/get_cable_byid/:billerId').get(verifyToken,GetCableOptByBillerID)

/**
 * @swagger
 * /cable_list:
 *   get:
 *     summary: Get Cable List
 *     tags: [Cable Apis]
 *     responses:
 *       200:
 *         description: Get Cable List Successfully!
 */
router.route('/cable_list').get(verifyToken,GetCableOperatortList);
/**
 * @swagger
 * /cable_opt/:billerId:
 *   get:
 *     summary: Get Cable Operator Config
 *     tags: [Cable Apis]
 *     responses:
 *       200:
 *         description: Get Cable Operator Config Successfully!
 */
router.route('/cable_opt/:billerId').get(verifyToken,CableOperatorConfig);

/**
 * @swagger
 * /validate_cable/:billerId:
 *   post:
 *     summary: Create Cable Operator
 *     tags: [Cable Apis]
 *     responses:
 *       200:
 *         description: Cable Operator Create Successfully!
 */
router.route('/validate_cable/:billerId').post(verifyToken,ValidateCableOperator);

/**
 * @swagger
 * /create_cable_payment:
 *   post:
 *     summary: Create Cable Operator Payment
 *     tags: [Cable Apis]
 *     responses:
 *       200:
 *         description: Cable Operator Payment Create Successfully!
 */
router.route('/create_cable_payment').post(verifyToken,createCablePayment);

export default router;