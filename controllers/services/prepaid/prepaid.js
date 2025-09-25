import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import prepaidOperatorModel from "../../../model/services/prepaid/prepaid.model.js";
import fs from "fs";
import { OrderHistory } from "../../../model/users/orderHistory.model.js";
import User from "../../../model/user.model.js";
import Offer from "../../../model/admin/offer.model.js";
import { OperatorLadger } from "../../../model/users/paymentLedger.model.js";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetPrepaidOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;

        if (!billerId) {
            return res.status(400).json(new APIError("BillerId required", 400));
        }

        const operatorIds = await broadbandModel.find({ "parameter.billerId": billerId, userId: req.user.id }, { _id: 1 });

        console.log(operatorIds);

        if (operatorIds.length == 0) {
            return res.status(400).json(new APIError("Operator Not Found", 400));
        }

        return res.status(200).json(new APIResponse("Prepaid Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetPrepaidOperatortList = async (req, res) => {
    try {
        const operators = Operators.filter((op) => {
            return op.Category === "Prepaid"
        });

        if (operators.length == 0) {
            return res.status(404).json(new APIError("No operators found for this category", 404));
        }

        return res.status(200).json(new APIResponse("Prepaid Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const PrepaidOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Prepaid" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }

        return res.status(200).json(new APIResponse("Prepaid Operator", 200, operator));

    } catch (error) {

        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidatePrepaidOperator = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Prepaid" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }
        const userData = req.body;
        if (!userData) {
            return res.status(400).json(new APIError("Required Data Not Found", 400));
        }

        const userKeys = Object.keys(userData).map(k => k);
        console.log("User keys:", userKeys);

        const possibleFields = [operator.Name, operator.cn, operator.adwithregex]
            .filter(f => typeof f === "string")
            .map(f => f);


        console.log("Possible fields:", possibleFields);
        const validations = Object.entries(userData).map(([key, value]) => {
            const normalizedKey = key;
            if (possibleFields.includes(normalizedKey)) {
                const regex = new RegExp(operator.Regex);
                console.log(regex);
                let testResult = regex.test(String(value))
                return {
                    field: key,
                    value,
                    isValid: testResult
                };
            } else {
                return {
                    field: key,
                    value,
                    isValid: false,
                    message: "Field not found in operator"
                };
            }
        });

        console.log("Validations:", validations);
        const hasInvalid = validations.some(v => !v.isValid);
        if (!hasInvalid) {
            await prepaidOperatorModel.create({
                userId: req.user.id,
                "parameter.category": "Prepaid",
                "parameter.billerId": billerId,
                parameter: userData
            });

            return res.status(400).json(new APIError("One or more fields are invalid", 400, validations));
        }
        return res.status(200).json(new APIResponse("Operator validated successfully", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};


function PrepaidAPI(req) {
    return {
        success: true,
        orderId: "MZXR45798XDD",
        details: req
    }
}
export const createPrepaidPayment = async (req, res) => {
    try {
        const order = await OrderHistory.create({
            userId: req.user.id,
            userData: userData,
            offerId
        });
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(404).json(new APIError("User not found", 404));
        }

        const offer = await Offer.findOne({ _id: offerId }).select("allowedUsers offerAmount");

        if (offer) {
            const isUserAllowed = offer.allowedUsers.some(u => u === req.user.id);

            if (!isUserAllowed) {
                return res.status(400).json(new APIError("User Not Allowed For This Offer", 400));
            }

            userData.amount = userData.amount - offer.offerAmount;
        }
        if (user.balance < userData.amount) {
            return res.status(400).json(new APIError("Insufficient Balance", 400));
        }
        user.balance = user.balance - userData.amount;
        await user.save();

        await OperatorLadger.create({
            offerAmount: offer.offerAmount,
            paymentAmount: userData.amount,
            balance: user.balance,
            category: "Prepaid",
            action: "debit",
            offerId,
            userId: req.user.id,
            userData
        });
        let response = PrepaidAPI(req.body);

        order.paymentStatus = response.success;
        order.save()
        return res.status(200).json(new APIResponse("Process Done", 200, response));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
}


