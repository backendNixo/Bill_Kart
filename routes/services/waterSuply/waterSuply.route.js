import {GetWaterSuplyOptByBillerID,GetWaterSuplyOperatortList,ValidateWaterSuplyOperator} from "../../../controllers/services/waterSuply/waterSuply.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/waterSuply_list/:category').get(verifyToken,GetWaterSuplyOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateWaterSuplyOperator);


export default router;
