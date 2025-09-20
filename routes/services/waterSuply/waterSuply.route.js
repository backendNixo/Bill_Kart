import {GetWaterSuplyOptByBillerID,GetWaterSuplyOperatortList,ValidateWaterSuplyOperator,WaterSupplyOperatorConfig} from "../../../controllers/services/waterSuply/waterSuply.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/waterSuply_list').get(verifyToken,GetWaterSuplyOperatortList);
router.route('/watersupply_opt/:billerId').get(verifyToken,WaterSupplyOperatorConfig);
router.route('/validate_watersupply/:billerId').post(verifyToken,ValidateWaterSuplyOperator);


export default router;
