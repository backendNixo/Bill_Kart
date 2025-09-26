
import User from "../../model/user.model.js";
import APIError from "../../utils/APIError.js";
import { OperatorLadger } from "../../model/users/paymentLedger.model.js"
import { APIResponse } from "../../utils/APIResponse.js";

export const ViewLedgerByUser = async (req, res) => {
    try {
        const { startDate, endDate } = req.body || {};

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }

        const dateWiseLedger = await OperatorLadger.find(
            {
                createdAt: { $gte: start, $lte: end },
                userId: req.user.id
            }).sort({ createdAt: -1 });

        if (dateWiseLedger.length === 0) {
            return res
                .status(400)
                .json(new APIError("Ledger List Empty", 400));
        }
        const totalpayment = dateWiseLedger.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );
        const totaloffer = dateWiseLedger.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );
        const list = {
            ...dateWiseLedger,
            totaloffer,
            totalpayment
        }
        return res.status(200).json(new APIResponse("Ledger List ", 200, list));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ViewLedgerBasedOnOpt = async (req, res) => {
    try {
        const optType = req.params.optType;

        // const isLedger = await OperatorLadger.find({ userId: userid, category: optType });
        // if (!isLedger) {
        //     return res.status(400).json(new APIError("Ledger Not Found For this Operator", 400));
        // }

        const { startDate, endDate } = req.body || {};

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }

        const dateWiseLedger = await OperatorLadger.find(
            {
                createdAt: { $gte: start, $lte: end },
                userId: req.user.id,
                category: optType
            }).sort({ createdAt: -1 });

        if (dateWiseLedger.length === 0) {
            return res
                .status(400)
                .json(new APIError("Ledger List Empty", 400));
        }
        const totalpayment = dateWiseLedger.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );
        const totaloffer = dateWiseLedger.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );
        const list = {
            ...dateWiseLedger,
            totaloffer,
            totalpayment
        }
        return res.status(200).json(new APIResponse("Ledger List ", 200, list));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

// export const ViewLedgerBasedOnDate = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.body || {};

//         let start, end;
//         if (startDate && endDate) {
//             start = new Date(startDate);
//             end = new Date(endDate);
//         } else {
//             start = new Date();
//             start.setHours(0, 0, 0, 0);
//             end = new Date();
//             end.setHours(23, 59, 59, 999);
//         }

//         const dateWiseLedger = await OperatorLadger.find(
//             {
//                 createdAt: { $gte: start, $lte: end },
//                 _id: req.user.id
//             }).sort({ createdAt: -1 });

//         if (dateWiseLedger.length === 0) {
//             return res
//                 .status(400)
//                 .json(new APIError("Ledger List Empty", 400));
//         }

//         return res
//             .status(200)
//             .json(new APIResponse("Ledger List ", 200, dateWiseLedger));

//     } catch (error) {
//         console.error(error);
//         return res
//             .status(500)
//             .json(new APIError("Error: " + (error.message || error), 500));
//     }
// };

export const ViewSuccessOrFailedLedger= async (req, res) => {
    try {
        const optStatus = req.params.status;

        const { startDate, endDate } = req.body || {};

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }

        const dateWiseLedger = await OperatorLadger.find(
            {
                createdAt: { $gte: start, $lte: end },
                userId: req.user.id,
                status: optStatus
            }).sort({ createdAt: -1 });

        if (dateWiseLedger.length === 0) {
            return res
                .status(400)
                .json(new APIError("Ledger List Empty", 400));
        }
        
        const totalpayment = dateWiseLedger.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );

        const totaloffer = dateWiseLedger.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );

        const list = {
            ...dateWiseLedger,
            totaloffer,
            totalpayment
        }
        return res.status(200).json(new APIResponse("Ledger List ", 200, list));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};








