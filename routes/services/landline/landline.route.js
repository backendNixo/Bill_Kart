import {GetLandLineOptByBillerID,GetLandLineOperatortList,ValidateLandLineOperator,LandlineOperatorConfig,createLandlinePayment} from "../../../controllers/services/landline/landline.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_landline_byid/:billerId').get(verifyToken,GetLandLineOptByBillerID);
router.route('/landline_list').get(verifyToken,GetLandLineOperatortList);
router.route('/landline_opt/:billerId').get(verifyToken,LandlineOperatorConfig);
router.route('/validate_landline/:billerId').post(verifyToken,ValidateLandLineOperator);
router.route('/create_landline_payment').post(verifyToken, createLandlinePayment);

export default router;

