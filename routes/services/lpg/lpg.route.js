import {
    GetLPGOptByBillerID,
    GetLPGOperatortList,
    LPGOperatorConfig,
    ValidateLPGtOperator,
    createLPGPayment
} from "../../../controllers/services/lpg/lpg.controller.js"
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_lpg_byid/:billerId').get(verifyToken,GetLPGOptByBillerID);
router.route('/lpg_list').get(verifyToken,GetLPGOperatortList);
router.route('/lpg_opt/:billerId').get(verifyToken,LPGOperatorConfig);
router.route('/validate_lpg/:billerId').post(verifyToken,ValidateLPGtOperator);
router.route('/create_lpg_payment').post(verifyToken, createLPGPayment);

export default router;