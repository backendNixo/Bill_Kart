import {GetGasOptByBillerID,GetGasOperatortList,ValidateGasOperator,GasOperatorConfig} from "../../../controllers/services/gas/gas.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_gas_byid/:billerId').get(verifyToken,GetGasOptByBillerID);
router.route('/gas_list').get(verifyToken,GetGasOperatortList);
router.route('/gas_opt/:billerId').get(verifyToken,GasOperatorConfig);
router.route('/validate_gas/:billerId').post(verifyToken,ValidateGasOperator);

export default router;