import {GetLandLineOptByBillerID,GetLandLineOperatortList,ValidateLandLineOperator,LandlineOperatorConfig} from "../../../controllers/services/landline/landline.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/landline_list').get(verifyToken,GetLandLineOperatortList);
router.route('/landline_opt/:billerId').get(verifyToken,LandlineOperatorConfig);
router.route('/validate_landline/:billerId').post(verifyToken,ValidateLandLineOperator);

export default router;

