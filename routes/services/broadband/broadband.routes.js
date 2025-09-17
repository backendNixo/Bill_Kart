import {GetbroadbandOptByBillerID,GetbroadbandOptList,ValidateBroadbandOperator} from "../../../controllers/services/broadband/broadband.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/braodband_list/:category').get(verifyToken,GetbroadbandOptList);
router.route('/broadband/:category/:billerId').post(verifyToken,ValidateBroadbandOperator);


export default router;