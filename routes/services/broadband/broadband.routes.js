import {BroadbandOperatorConfig, GetbroadbandOptByBillerID,GetbroadbandOptList,ValidateBroadbandOperators} from "../../../controllers/services/broadband/broadband.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/broadband_list').get(verifyToken,GetbroadbandOptList);
router.route('/broadband_opt/:billerId').get(verifyToken,BroadbandOperatorConfig);
router.route('/validate_broadband/:billerId').post(verifyToken,ValidateBroadbandOperators);


export default router;