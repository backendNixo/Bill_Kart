import {GetDataOptByBillerID,GetDataOperatortList,ValidateDataOperator,DatacardOperatorConfig,createDataCardPayment} from "../../../controllers/services/datacardPrepaid/dataCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";


router.route('/get_datacard_byid/:billerId').get(verifyToken,GetDataOptByBillerID)
router.route('/dataCard_list').get(verifyToken,GetDataOperatortList);
router.route('/datacard_opt/:billerId').get(verifyToken,DatacardOperatorConfig);
router.route('/validate_datacard/:billerId').post(verifyToken,ValidateDataOperator);
router.route('/create_datacard_payment').post(verifyToken,createDataCardPayment);


export default router;