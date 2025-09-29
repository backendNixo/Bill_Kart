import {GetDTHOptByBillerID,GetDTHOperatortList,ValidateDTHOperator,DTHOperatorConfig,createDTHPayment} from "../../../controllers/services/DTH/dth.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";




/**
 * @swagger
 * /get_dth_byid/:billerId:
 *   get:
 *     summary: Get DTH By Id
 *     tags: [DTH Apis]
 *     responses:
 *       200:
 *         description: Get DTH By Id Successfully!
 */
router.route('/get_dth_byid/:billerId').get(verifyToken,GetDTHOptByBillerID);

/**
 * @swagger
 * /dth_list:
 *   get:
 *     summary: Get DTH List
 *     tags: [DTH Apis]
 *     responses:
 *       200:
 *         description: Get DTH List Successfully!
 */
router.route('/dth_list').get(verifyToken,GetDTHOperatortList);

/**
 * @swagger
 * /dth_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [DTH Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/dth_opt/:billerId').get(verifyToken,DTHOperatorConfig);

/**
 * @swagger
 * /validate_dth/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [DTH Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_dth/:billerId').post(verifyToken,ValidateDTHOperator);

/**
 * @swagger
 * /create_dth_payment:
 *   post:
 *     summary: Create DTH Payment
 *     tags: [DTH Apis]
 *     responses:
 *       200:
 *         description: Create DTH Successfully!
 */
router.route('/create_dth_payment').post(verifyToken, createDTHPayment);


export default router;