import {
    addRedeeme
} from "../../controllers/user/redeeme.controller.js";
import {verifyToken} from "../../middleware/verifyToken.js";
import express from "express";
const router=express.Router();

/**
 * @swagger
 * /add_redeeme:
 *   post:
 *     summary: Add Redeeme
 *     tags: [Redeeme Apis]
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
 *               offerId:
 *                 type: object
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Redeeme Created Successfully!
 */
router.route('/add_redeeme').post(verifyToken,addRedeeme);

export default router;