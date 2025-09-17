import {GetEMIOptByBillerID,GetEMIOperatortList,ValidateEMIPaymentOperator} from "../../../controllers/services/EMIPayment/EmiPayment.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/emi_list/:category').get(verifyToken,GetEMIOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateEMIPaymentOperator);


export default router;