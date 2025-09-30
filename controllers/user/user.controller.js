
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

        if (!optType) {
            return res.status(400).json(new APIError("Operator Not Found", 400));
        }

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

// export const ViewUserLedger7DayOld= async (req, res) => {
//   try {
   
//     const todayDate = new Date(); 
//     const sevenDaysAgo = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000); 

//     const ledgers = await OperatorLadger.find({
//       userId: req.user.id,
//       createdAt: { $gte: sevenDaysAgo, $lte: todayDate }
//     });

//     if (ledgers.length === 0) {
//       return res.status(400).json(new APIError("No Ledger List Found in Last 7 Days", 400));
//     }

//     let Totalsuccess = 0;
//     let Totalfailed = 0;
//     let Totalpending = 0;

//     ledgers.forEach(d => {
//       if (d.status === "success") Totalsuccess++;
//       else if (d.status === "pending") Totalpending++;
//       else Totalfailed++;
//     });

//     const statusCounts = {
//       success: Totalsuccess,
//       pending: Totalpending,
//       failed: Totalfailed
//     };

//     return res
//       .status(200)
//       .json(new APIResponse("User Ledgers in Last 7 Days:", 200, statusCounts));

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(new APIError("Error :" + error.message, 500));
//   }
// };

export const ViewUserLedgerDayOld = async (req, res) => {
  try {
    const todayDate = new Date();
    const sevenDaysAgo = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const usersLedger = await userModel.findOne({
      _id: req.user.id
    })
      .populate({
        path: "OperatorLadger",
        match: { createdAt: { $gte: sevenDaysAgo, $lte: todayDate } },
        options: { sort: { createdAt: -1 } }
      });

    if (!usersLedger) {
      return res.status(400).json(new APIError("User Not Found", 400));
    }

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayWiseCounts = {};
    weekdays.forEach(day => {
      dayWiseCounts[day] = { success: 0, pending: 0, failed: 0 };
    });

    usersLedger.forEach(ledger => {
          const dayName = new Date(ledger.createdAt).toLocaleString("en-US", { weekday: "long" });

          if (ledger.status === "success") dayWiseCounts[dayName].success++;
          else if (ledger.status === "pending") dayWiseCounts[dayName].pending++;
          else dayWiseCounts[dayName].failed++;
        });


    const chartData = weekdays.map(day => ({
      day,
      ...dayWiseCounts[day]
    }));

    return res
      .status(200)
      .json(new APIResponse("Admin Users Ledgers in Last 7 Days :", 200, chartData));

  } catch (error) {
    console.error(error);
    return res.status(500).json(new APIError("Error :" + error.message, 500));
  }
};
 












