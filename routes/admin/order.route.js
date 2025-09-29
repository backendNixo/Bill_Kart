import { formToJSON } from "axios";
import {
    GetOrderHistory,
    GetOrderHistoryById,
    GetOrderHistoryDate
} from "../../controllers/admin/order.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

import express from "express";
const router = express.Router();


/**
 * @swagger
 * /get_order_history_list:
 *   get:
 *     summary: Get Order Api
 *     tags: [Order Apis]
 *     responses:
 *       200:
 *         description: Get Order Successfully!
 */
router.route('/get_order_history_list').get(verifyToken, GetOrderHistory);

/**
 * @swagger
 * /get_order_history_byid/:id:
 *   get:
 *     summary: Get Order History By Id
 *     tags: [Order Apis]
 *     responses:
 *       200:
 *         description: Get Order History By Id Successfully!
 */
router.route('/get_order_history_byid/:id').get(verifyToken, GetOrderHistoryById);

/**
 * @swagger
 * /get_order_history_btw_date:
 *   get:
 *     summary: Get Order History By DATE
 *     tags: [Order Apis]
 *     responses:
 *       200:
 *         description: Get Order History By DATE Successfully!
 */
router.route('/get_order_history_btw_date').get(verifyToken, GetOrderHistoryDate);

export default router;

