import {GetPostpaidOptByBillerID,GetPostpaidOperatortList,ValidatePostpaidOperator,PostpaidOperatorConfig} from "../../../controllers/services/postpaid/postpaid.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/postpaid_list').get(verifyToken,GetPostpaidOperatortList);
router.route('/postpaid_opt/:billerId').get(verifyToken,PostpaidOperatorConfig);
router.route('/validate_postpaid/:billerId').post(verifyToken,ValidatePostpaidOperator);

export default router;




