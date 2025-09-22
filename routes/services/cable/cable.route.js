import {GetCableOptByBillerID,GetCableOperatortList,CableOperatorConfig,ValidateCableOperator} from "../../../controllers/services/cable/cable.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/get_cable_byid/:billerId').get(verifyToken,GetCableOptByBillerID)
router.route('/cable_list').get(verifyToken,GetCableOperatortList);
router.route('/cable_opt/:billerId').get(verifyToken,CableOperatorConfig);
router.route('/validate_cable/:billerId').post(verifyToken,ValidateCableOperator);


export default router;