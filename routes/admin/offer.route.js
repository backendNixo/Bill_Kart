import {
    CreateOffer,
    DeleteOffer,
    UpdateOffer,
    GetOfferList,
    GetOfferById
} from "../../controllers/admin/offer.controller.js";
import {verifyToken} from "../../middleware/verifyToken.js";
import express from "express";
const router=express.Router();

/**
 * @swagger
 * /create_offer:
 *   post:
 *     summary: Create Offer
 *     tags: [Offer Apis]
 *     parameters:
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               maxAmount:
 *                 type: number
 *               minAmount:
 *                 type: number
 *               offerType:
 *                 type: string
 *               offerName:
 *                 type: string
 *               offerAmount:
 *                 type: number
 *               expiryDate:
 *                 type: date
 *               offerFor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Offer Created Successfully!
 */
router.route('/create_offer').post(verifyToken,CreateOffer);

/**
 * @swagger
 * /delete_offer/:id:
 *   delete:
 *     summary: Delete Offer
 *     tags: [Offer Apis]
 *     responses:
 *       200:
 *         description: Offer Deleted Successfully!
 */
router.route('/delete_offer/:id').delete(verifyToken,DeleteOffer);
/**
 * @swagger
 * /update_offer/:id:
 *   patch:
 *     summary: Update Offer
 *     tags: [Offer Apis]
 *     responses:
 *       200:
 *         description: Offer Updated Successfully!
 */
router.route('/update_offer/:id').patch(verifyToken,UpdateOffer);
/**
 * @swagger
 * /get_offer_list:
 *   get:
 *     summary: Get Offer List
 *     tags: [Offer Apis]
 *     responses:
 *       200:
 *         description: Get Offer List Successfully!
 */
router.route('/get_offer_list').get(verifyToken,GetOfferList);

/**
 * @swagger
 * /get_offer_byid/:id:
 *   get:
 *     summary: Get Offer By Id
 *     tags: [Offer Apis]
 *     responses:
 *       200:
 *         description: Get Offer By Id Successfully!
 */
router.route('/get_offer_byid/:id').get(verifyToken,GetOfferById);

export default router;