import {
    GetWaterSuplyOptByBillerID,
    GetWaterSuplyOperatortList,
    ValidateWaterSuplyOperator,
    WaterSupplyOperatorConfig,
    createWaterSuplyPayment
} from "../../../controllers/services/waterSuply/waterSuply.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_watersupply_byid/:billerId:
 *   get:
 *     summary: Get WaterSupply By Id
 *     tags: [WaterSupply Apis]
 *     responses:
 *       200:
 *         description: Get WaterSupply By Id Successfully!
 */
router.route('/get_watersupply_byid/:billerId').get(verifyToken,GetWaterSuplyOptByBillerID);

/**
 * @swagger
 * /waterSuply_list:
 *   get:
 *     summary: Get WaterSupply List
 *     tags: [WaterSupply Apis]
 *     responses:
 *       200:
 *         description: Get WaterSupply List Successfully!
 */
router.route('/waterSuply_list').get(verifyToken,GetWaterSuplyOperatortList);

/**
 * @swagger
 * /watersupply_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [WaterSupply Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/watersupply_opt/:billerId').get(verifyToken,WaterSupplyOperatorConfig);

/**
 * @swagger
 * /validate_watersupply/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [WaterSupply Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_watersupply/:billerId').post(verifyToken,ValidateWaterSuplyOperator);

/**
 * @swagger
 * /create_watersupply_payment:
 *   post:
 *     summary: Create WaterSupply Payment
 *     tags: [WaterSupply Apis]
 *     responses:
 *       200:
 *         description: Create WaterSupply Payment Successfully!
 */
router.route('/create_watersupply_payment').post(verifyToken, createWaterSuplyPayment);

export default router;
