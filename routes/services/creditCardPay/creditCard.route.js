import {GetCreditOptByBillerID,GetCreditOperatortList,ValidateCreditOperator,CreditOperatorConfig} from "../../../controllers/services/creditCardPay/creditCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/creditCard_list').get(verifyToken,GetCreditOperatortList);
router.route('/credit_opt/:billerId').get(verifyToken,CreditOperatorConfig);
router.route('/validate_creditcard/:billerId').post(verifyToken,ValidateCreditOperator);


export default router;