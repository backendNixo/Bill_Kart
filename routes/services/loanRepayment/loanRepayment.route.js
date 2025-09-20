import {
    GetLoanRepaymentOptByBillerID,
    GetLoanRepaymentOperatortList,
    LoanRepaymentOperatorConfig,
    ValidateLoanRepaymentOperator
} from "../../../controllers/services/loanRepayment/loanRepayment.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/loanRepayment_list').get(verifyToken,GetLoanRepaymentOperatortList);
router.route('/loanRepayment_opt/:billerId').get(verifyToken,LoanRepaymentOperatorConfig);
router.route('/validate_loanRepayment/:billerId').post(verifyToken,ValidateLoanRepaymentOperator);


export default router;