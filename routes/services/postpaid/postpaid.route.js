import {GetPostpaidOptByBillerID,GetPostpaidOperatortList,ValidatePostpaidOperator,PostpaidOperatorConfig,createPostpaidPayment} from "../../../controllers/services/postpaid/postpaid.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_postpaid_byid/:billerId').get(verifyToken,GetPostpaidOptByBillerID);
router.route('/postpaid_list').get(verifyToken,GetPostpaidOperatortList);
router.route('/postpaid_opt/:billerId').get(verifyToken,PostpaidOperatorConfig);
router.route('/validate_postpaid/:billerId').post(verifyToken,ValidatePostpaidOperator);
router.route('/create_postpaid_payment').post(verifyToken, createPostpaidPayment);

export default router;




