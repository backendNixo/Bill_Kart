import {GetDataOptByBillerID,GetDataOperatortList,ValidateDataOperator} from "../../../controllers/services/datacardPrepaid/dataCard.controller.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../../middleware/verifyToken.js";

router.route('/dataCard_list/:category').get(verifyToken,GetDataOperatortList);
router.route('/:category/:billerId').post(verifyToken,ValidateDataOperator);


export default router;