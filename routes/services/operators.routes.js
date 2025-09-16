import {GetPrepaidOperator,PrepaidOperator} from "../../controllers/services/prepaid/prepaid.js";
import express from "express";
const router=express.Router();
import {verifyToken} from "../../middleware/verifyToken.js";

router.route('/prepaid/:billerId').get(verifyToken,GetPrepaidOperator);


export default router;