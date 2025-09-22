import {
    GetMunicipalityOptByBillerID,
    GetMunicipalityOperatortList,
    MunicipalityOperatorConfig,
    ValidateMunicipalitytOperator
} from "../../../controllers/services/municipality/municipality.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_municipality_byid/:billerId').get(verifyToken,GetMunicipalityOptByBillerID);
router.route('/municipality_list').get(verifyToken,GetMunicipalityOperatortList);
router.route('/municipality_opt/:billerId').get(verifyToken,MunicipalityOperatorConfig);
router.route('/validate_municipality/:billerId').post(verifyToken,ValidateMunicipalitytOperator);


export default router;