import { formToJSON } from "axios";
import {
    GetOrderHistory,
    GetOrderHistoryById,
    GetOrderHistoryDate
} from "../../controllers/admin/order.controller.js";
import {verifyToken} from "../../middleware/verifyToken.js";

import express from "express";
const router=express.Router();

router.route('/get_order_history_list').get(verifyToken,GetOrderHistory);
router.route('/get_order_history_byid/:id').get(verifyToken,GetOrderHistoryById);
router.route('/get_order_history_btw_date').get(verifyToken,GetOrderHistoryDate);

export default router;

