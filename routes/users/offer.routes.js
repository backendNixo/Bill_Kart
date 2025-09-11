import {ShowUOffers} from "../../controllers/user/offer.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import express from "express";
const router=express.Router();


/**
 * @swagger
 * /show_offers:
 *   post:
 *     summary: Add Redeeme
 *     tags: [Offer Apis For Users]
 *     responses:
 *       200:
 *         description: Offer Fetched Successfully!
 */
router.route('/show_offers').post(verifyToken,ShowUOffers);

export default router;


