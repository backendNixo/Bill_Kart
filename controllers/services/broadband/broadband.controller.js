import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import broadbandModel from "../../../model/services/broadband/broadband.model.js";


export const GetbroadbandOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("Biller Id required", 400));
        }

        const operator = await broadbandModel.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("Broadband Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};


export const GetbroadbandOperator = async (req, res) => {
    try {
        const { opId, operatorName, category, mobileNumber } = req.body;

        if (!operatorName || !category || !opId) {
            return res.status(400).json(new APIError("Name and  Operator Catergory are required", 400));
        }

        let operator = null;

        operator = await broadbandModel.findOne({ "parameter.mobileNumber": mobileNumber });


        if (!operator) {
            operator = await broadbandModel.create({
                userId: req.user.id,
                "parameter.opId": opId,
                "parameter.billerId": req.body.billerId??"",
                "parameter.operatorName": operatorName,
                "parameter.category": category,
                "parameter.viewBill": req.body.viewBill??"",
                "parameter.bbpsEnabled": req.body.bbpsEnabled??"",
                "parameter.mobileNumber": mobileNumber,
                "parameter.name": req.body.name??"",
                "parameter.cn": req.body.cn??""
            });
        }

        return res.status(200).json(new APIResponse("BroadBand Operator fetched successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};



