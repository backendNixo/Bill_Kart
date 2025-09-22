import {GetPrepaidOptByBillerID,GetPrepaidOperatortList,ValidatePrepaidOperator,PrepaidOperatorConfig} from "../../../controllers/services/prepaid/prepaid.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_prepaid_byid/:billerId').get(verifyToken,GetPrepaidOptByBillerID);
router.route('/prepaid_list').get(verifyToken,GetPrepaidOperatortList);
router.route('/prepaid_opt/:billerId').get(verifyToken,PrepaidOperatorConfig);
router.route('/validate_prepaid/:billerId').post(verifyToken,ValidatePrepaidOperator);

export default router;



