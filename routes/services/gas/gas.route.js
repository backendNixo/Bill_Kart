import {GetGasOptByBillerID,GetGasOperatortList,ValidateGasOperator} from "../../../controllers/services/gas/gas.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/gas_list/:category').get(verifyToken,GetGasOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateGasOperator);


export default router;