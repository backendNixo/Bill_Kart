import {GetEMIOptByBillerID,GetEMIOperatortList,ValidateEMIPaymentOperator,EMIOperatorConfig,createEMIPayment} from "../../../controllers/services/EMIPayment/EmiPayment.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";



router.route('/get_emi_byid/:billerId').get(verifyToken,GetEMIOptByBillerID);
router.route('/emi_list').get(verifyToken,GetEMIOperatortList);
router.route('/emi_opt/:billerId').get(verifyToken,EMIOperatorConfig);
router.route('/validate_emi/:billerId').post(verifyToken,ValidateEMIPaymentOperator);
router.route('/create_electricity_payment').post(verifyToken, createEMIPayment);

export default router;