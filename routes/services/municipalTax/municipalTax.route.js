import {
    GetMunicipalTaxOptByBillerID,
    GetMunicipalTaxOperatortList,
    MunicipalTaxOperatorConfig,
    ValidateMunicipalTaxtOperator,
    createMunicipalTaxPayment
} from "../../../controllers/services/municipalTax/municipal.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_municipal_byid/:billerId:
 *   get:
 *     summary: Get MunicipalTax By Id
 *     tags: [MunicipalTax Apis]
 *     responses:
 *       200:
 *         description: Get MunicipalTax By Id Successfully!
 */
router.route('/get_municipal_byid/:billerId').get(verifyToken,GetMunicipalTaxOptByBillerID);

/**
 * @swagger
 * /municipaltax_list:
 *   get:
 *     summary: Get MunicipalTax List
 *     tags: [MunicipalTax Apis]
 *     responses:
 *       200:
 *         description: Get MunicipalTax List Successfully!
 */
router.route('/municipaltax_list').get(verifyToken,GetMunicipalTaxOperatortList);

/**
 * @swagger
 * /municipaltax_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [MunicipalTax Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/municipaltax_opt/:billerId').get(verifyToken,MunicipalTaxOperatorConfig);

/**
 * @swagger
 * /validate_municipaltax/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [MunicipalTax Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_municipaltax/:billerId').post(verifyToken,ValidateMunicipalTaxtOperator);

/**
 * @swagger
 * /create_municipaltax_payment:
 *   post:
 *     summary: Create MunicipalTax Payment
 *     tags: [MunicipalTax Apis]
 *     responses:
 *       200:
 *         description: Create MunicipalTax Payment Successfully!
 */
router.route('/create_municipaltax_payment').post(verifyToken, createMunicipalTaxPayment);
export default router;