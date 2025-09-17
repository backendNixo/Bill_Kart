import {GetCableOptByBillerID,GetCableOperatortList,ValidateCableOperator} from "../../../controllers/services/cable/cable.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/cable_list/:category').get(verifyToken,GetCableOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateCableOperator);


export default router;