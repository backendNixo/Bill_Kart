import {
    GetFastagOptByBillerID,
    GetFastagOperatortList,
    FastagOperatorConfig,
    ValidateFastagOperator,
    createFastagPayment
} from "../../../controllers/services/fastag/fastag.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";



router.route('/get_fastag_byid/:billerId').get(verifyToken,GetFastagOptByBillerID);
router.route('/fastag_list').get(verifyToken,GetFastagOperatortList);
router.route('/fastag_opt/:billerId').get(verifyToken,FastagOperatorConfig);
router.route('/validate_fastag/:billerId').post(verifyToken,ValidateFastagOperator);
router.route('/create_fastag_payment').post(verifyToken, createFastagPayment);


export default router;