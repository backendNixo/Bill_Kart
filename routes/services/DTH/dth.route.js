import {GetDTHOptByBillerID,GetDTHOperatortList,ValidateDTHOperator} from "../../../controllers/services/DTH/dth.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/dth_list/:category').get(verifyToken,GetDTHOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateDTHOperator);


export default router;