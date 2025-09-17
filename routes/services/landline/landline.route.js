import {GetLandLineOptByBillerID,GetLandLineOperatortList,ValidateLandLineOperator} from "../../../controllers/services/landline/landline.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/landline_list/:category').get(verifyToken,GetLandLineOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateLandLineOperator);


export default router;

