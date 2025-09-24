import {
    GetDonationOptByBillerID,
    GetDonationOperatortList,
    DonationOperatorConfig,
    ValidateDonationOperator,
    createDonationPayment
} from "../../../controllers/services/donation/donation.controller.js"
import express from "express";
const router = express.Router();
import { verifyToken } from "../../../middleware/verifyToken.js";



router.route('/get_donation_byid/:billerId').get(verifyToken, GetDonationOptByBillerID)
router.route('/donation_list').get(verifyToken, GetDonationOperatortList);
router.route('/donation_opt/:billerId').get(verifyToken, DonationOperatorConfig);
router.route('/validate_donation/:billerId').post(verifyToken, ValidateDonationOperator);
router.route('/create_donation_payment').post(verifyToken, createDonationPayment);


export default router;