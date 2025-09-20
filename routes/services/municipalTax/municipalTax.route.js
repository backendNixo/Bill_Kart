import {
    GetMunicipalTaxOptByBillerID,
    GetMunicipalTaxOperatortList,
    MunicipalTaxOperatorConfig,
    ValidateMunicipalTaxtOperator
} from "../../../controllers/services/municipalTax/municipal.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/municipaltax_list').get(verifyToken,GetMunicipalTaxOperatortList);
router.route('/municipaltax_opt/:billerId').get(verifyToken,MunicipalTaxOperatorConfig);
router.route('/validate_municipaltax/:billerId').post(verifyToken,ValidateMunicipalTaxtOperator);


export default router;