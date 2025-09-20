import {GetDTHOptByBillerID,GetDTHOperatortList,ValidateDTHOperator,DTHOperatorConfig} from "../../../controllers/services/DTH/dth.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/dth_list').get(verifyToken,GetDTHOperatortList);
router.route('/dth_opt/:billerId').get(verifyToken,DTHOperatorConfig);
router.route('/validate_dth/:billerId').post(verifyToken,ValidateDTHOperator);


export default router;