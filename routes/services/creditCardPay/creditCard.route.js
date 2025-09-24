import {GetCreditOptByBillerID,GetCreditOperatortList,ValidateCreditOperator,CreditOperatorConfig,createCreditCardPayment} from "../../../controllers/services/creditCardPay/creditCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/get_creditcard_byid/:billerId').get(verifyToken,GetCreditOptByBillerID)
router.route('/creditCard_list').get(verifyToken,GetCreditOperatortList);
router.route('/credit_opt/:billerId').get(verifyToken,CreditOperatorConfig);
router.route('/validate_creditcard/:billerId').post(verifyToken,ValidateCreditOperator);
router.route('/create_creditcard_payment').post(verifyToken,createCreditCardPayment);


export default router;