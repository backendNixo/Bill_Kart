import {
    GetWaterSuplyOptByBillerID,
    GetWaterSuplyOperatortList,
    ValidateWaterSuplyOperator,
    WaterSupplyOperatorConfig,
    createWaterSuplyPayment
} from "../../../controllers/services/waterSuply/waterSuply.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_watersupply_byid/:billerId').get(verifyToken,GetWaterSuplyOptByBillerID);
router.route('/waterSuply_list').get(verifyToken,GetWaterSuplyOperatortList);
router.route('/watersupply_opt/:billerId').get(verifyToken,WaterSupplyOperatorConfig);
router.route('/validate_watersupply/:billerId').post(verifyToken,ValidateWaterSuplyOperator);
router.route('/create_watersupply_payment').post(verifyToken, createWaterSuplyPayment);

export default router;
