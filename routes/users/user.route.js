import {
    ViewLedgerByUser,
    ViewLedgerBasedOnOpt,
    ViewSuccessOrFailedLedger,
    ViewUserLedgerDayOld
} from "../../controllers/user/user.controller.js";
import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
const router = express.Router();


/**
 * @swagger
 * /get_ledger_list_byuser:
 *   get:
 *     summary: Get Ledgers By Users List
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Ledgers List Fetched Successfully!
 */
router.route("/get_ledger_list_byuser").get(verifyToken, ViewLedgerByUser);

/**
 * @swagger
 * /get_ledger_based_on_Operator/:opttype:
 *   get:
 *     summary: Get Users Ledgers Based On Date List
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Users Ledgers List Based On Date Fetched Successfully!
 */
router.route("/get_ledger_based_on_Operator/:opttype").get(verifyToken, ViewLedgerBasedOnOpt);

/**
 * @swagger
 * /get_ledger_based_on_Operator/:status:
 *   get:
 *     summary: Get Users Ledgers Based On Status List
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Users Ledgers List Based On Status Fetched Successfully!
 */
router.route("/get_ledger_based_on_Operator/:status").get(verifyToken, ViewSuccessOrFailedLedger);


/**
 * @swagger
 * /show_ledger_status_graph:
 *   get:
 *     summary: Show Ledgers Status Graph
 *     tags: [User Apis]
 *     responses:
 *       200:
 *         description: Show Ledgers Status Graph Successfully!
 */
router.route('/show_ledger_status_graph').get(verifyToken,ViewUserLedgerDayOld);

export default router;