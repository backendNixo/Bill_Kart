import {GetPrepaidOptByBillerID,GetPrepaidOperatortList,ValidatePrepaidOperator} from "../../../controllers/services/prepaid/prepaid.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/prepaid_list/:category').get(verifyToken,GetPrepaidOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidatePrepaidOperator);


export default router;



