import {GetDataOptByBillerID,GetDataOperatortList,ValidateDataOperator,DatacardOperatorConfig,createDataCardPayment} from "../../../controllers/services/datacardPrepaid/dataCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


/**
 * @swagger
 * /get_datacard_byid/:billerId:
 *   get:
 *     summary: Get Data Card By Id
 *     tags: [Data Card Apis]
 *     responses:
 *       200:
 *         description: Get Data Card By Id Successfully!
 */
router.route('/get_datacard_byid/:billerId').get(verifyToken,GetDataOptByBillerID)
/**
 * @swagger
 * /dataCard_list:
 *   get:
 *     summary: Get Data Card List
 *     tags: [Data Card Apis]
 *     responses:
 *       200:
 *         description: Get Data Card List Successfully!
 */
router.route('/dataCard_list').get(verifyToken,GetDataOperatortList);

/**
 * @swagger
 * /datacard_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Data Card Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/datacard_opt/:billerId').get(verifyToken,DatacardOperatorConfig);

/**
 * @swagger
 * /validate_datacard/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Data Card Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_datacard/:billerId').post(verifyToken,ValidateDataOperator);

/**
 * @swagger
 * /create_datacard_payment:
 *   post:
 *     summary: Create Data Card Payment
 *     tags: [Data Card Apis]
 *     responses:
 *       200:
 *         description: Create Data Card Payment Successfully!
 */
router.route('/create_datacard_payment').post(verifyToken,createDataCardPayment);


export default router;