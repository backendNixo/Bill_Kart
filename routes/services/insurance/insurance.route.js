import {GetInsuranceOptByBillerID,GetInsuranceOperatortList,ValidateInsuranceOperator,InsuranceOperatorConfig} from "../../../controllers/services/insurance/insurance.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_insurance_byid/:billerId').get(verifyToken,GetInsuranceOptByBillerID);
router.route('/insurance_list').get(verifyToken,GetInsuranceOperatortList);
router.route('/insurance_opt/:billerId').get(verifyToken,InsuranceOperatorConfig);
router.route('/validate_insurance/:billerId').post(verifyToken,ValidateInsuranceOperator);

export default router;