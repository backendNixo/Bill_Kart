import {GetElectricityOptByBillerID,GetElectricityOperatortList,ValidateElectricityOperator,ElectricityOperatorConfig} from "../../../controllers/services/electricity/electricity.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";



router.route('/get_electricity_byid/:billerId').get(verifyToken,GetElectricityOptByBillerID);
router.route('/electricity_list').get(verifyToken,GetElectricityOperatortList);
router.route('/electricity_opt/:billerId').get(verifyToken,ElectricityOperatorConfig);
router.route('/validate_electricity/:billerId').post(verifyToken,ValidateElectricityOperator);

export default router;