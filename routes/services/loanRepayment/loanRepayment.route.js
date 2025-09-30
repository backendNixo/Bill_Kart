import {
    GetLoanRepaymentOptByBillerID,
    GetLoanRepaymentOperatortList,
    LoanRepaymentOperatorConfig,
    ValidateLoanRepaymentOperator,
    createLoanPayment
} from "../../../controllers/services/loanRepayment/loanRepayment.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

/**
 * @swagger
 * /get_loan_byid/:billerId:
 *   get:
 *     summary: Get LoanRepayment By Id
 *     tags: [LoanRepayment Apis]
 *     responses:
 *       200:
 *         description: Get LoanRepayment By Id Successfully!
 */
router.route('/get_loan_byid/:billerId').get(verifyToken,GetLoanRepaymentOptByBillerID);

/**
 * @swagger
 * /loanRepayment_list:
 *   get:
 *     summary: Get LoanRepayment List
 *     tags: [LoanRepayment Apis]
 *     responses:
 *       200:
 *         description: Get LoanRepayment List Successfully!
 */
router.route('/loanRepayment_list').get(verifyToken,GetLoanRepaymentOperatortList);

/**
 * @swagger
 * /loanRepayment_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [LoanRepayment Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/loanRepayment_opt/:billerId').get(verifyToken,LoanRepaymentOperatorConfig);

/**
 * @swagger
 * /validate_loanRepayment/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [LoanRepayment Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_loanRepayment/:billerId').post(verifyToken,ValidateLoanRepaymentOperator);

/**
 * @swagger
 * /create_loan_payment:
 *   post:
 *     summary: Create LoanRepayment Payment
 *     tags: [LoanRepayment Apis]
 *     responses:
 *       200:
 *         description: Create LoanRepayment Payment Successfully!
 */
router.route('/create_loan_payment').post(verifyToken, createLoanPayment);

export default router;