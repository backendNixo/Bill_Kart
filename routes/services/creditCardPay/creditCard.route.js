import {GetCreditOptByBillerID,GetCreditOperatortList,ValidateCreditOperator} from "../../../controllers/services/creditCardPay/creditCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/creditCard_list/:category').get(verifyToken,GetCreditOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateCreditOperator);


export default router;