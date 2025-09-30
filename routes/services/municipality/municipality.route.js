import {
    GetMunicipalityOptByBillerID,
    GetMunicipalityOperatortList,
    MunicipalityOperatorConfig,
    ValidateMunicipalitytOperator,
    createMunicipalityPayment
} from "../../../controllers/services/municipality/municipality.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_municipality_byid/:billerId:
 *   get:
 *     summary: Get Municipality By Id
 *     tags: [Municipality Apis]
 *     responses:
 *       200:
 *         description: Get Municipality By Id Successfully!
 */
router.route('/get_municipality_byid/:billerId').get(verifyToken,GetMunicipalityOptByBillerID);

/**
 * @swagger
 * /municipality_list:
 *   get:
 *     summary: Get Municipality List
 *     tags: [Municipality Apis]
 *     responses:
 *       200:
 *         description: Get Municipality List Successfully!
 */
router.route('/municipality_list').get(verifyToken,GetMunicipalityOperatortList);

/**
 * @swagger
 * /municipality_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Municipality Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/municipality_opt/:billerId').get(verifyToken,MunicipalityOperatorConfig);

/**
 * @swagger
 * /validate_municipality/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Municipality Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_municipality/:billerId').post(verifyToken,ValidateMunicipalitytOperator);

/**
 * @swagger
 * /create_municipality_payment:
 *   post:
 *     summary: Create Municipality Payment
 *     tags: [Municipality Apis]
 *     responses:
 *       200:
 *         description: Create Municipality Payment Successfully!
 */
router.route('/create_municipality_payment').post(verifyToken, createMunicipalityPayment);

export default router;