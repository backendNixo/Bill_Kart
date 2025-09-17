import {GetElectricityOptByBillerID,GetElectricityOperatortList,ValidateElectricityOperator} from "../../../controllers/services/electricity/electricity.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/electricity_list/:category').get(verifyToken,GetElectricityOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateElectricityOperator);


export default router;