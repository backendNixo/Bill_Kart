import {GetInsuranceOptByBillerID,GetInsuranceOperatortList,ValidateInsuranceOperator} from "../../../controllers/services/insurance/insurance.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/insurance_list/:category').get(verifyToken,GetInsuranceOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateInsuranceOperator);


export default router;