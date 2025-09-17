import {GetPostpaidOptByBillerID,GetPostpaidOperatortList,ValidatePostpaidOperator} from "../../../controllers/services/postpaid/postpaid.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/postpaid_list/:category').get(verifyToken,GetPostpaidOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidatePostpaidOperator);


export default router;




