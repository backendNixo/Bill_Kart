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


/**
 * @swagger
 * /get_donation_byid/:billerId:
 *   get:
 *     summary: Get Donation By Id
 *     tags: [Donation Apis]
 *     responses:
 *       200:
 *         description: Get Donation By Id Successfully!
 */
router.route('/get_donation_byid/:billerId').get(verifyToken, GetDonationOptByBillerID)

/**
 * @swagger
 * /donation_list:
 *   get:
 *     summary: Get Donation List
 *     tags: [Donation Apis]
 *     responses:
 *       200:
 *         description: Get Donation List Successfully!
 */
router.route('/donation_list').get(verifyToken, GetDonationOperatortList);

/**
 * @swagger
 * /donation_opt/:billerId:
 *   get:
 *     summary: Operator Config By Id
 *     tags: [Donation Apis]
 *     responses:
 *       200:
 *         description: Operator Config By Id Successfully!
 */
router.route('/donation_opt/:billerId').get(verifyToken, DonationOperatorConfig);

/**
 * @swagger
 * /validate_donation/:billerId:
 *   post:
 *     summary: Validate Operator
 *     tags: [Donation Apis]
 *     responses:
 *       200:
 *         description: Validate Operator Successfully!
 */
router.route('/validate_donation/:billerId').post(verifyToken, ValidateDonationOperator);

/**
 * @swagger
 * /create_donation_payment:
 *   post:
 *     summary: Create Donation Payment
 *     tags: [Donation Apis]
 *     responses:
 *       200:
 *         description: Create Donation Successfully!
 */
router.route('/create_donation_payment').post(verifyToken, createDonationPayment);


export default router;