import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import broadbandModel from "../../../model/services/broadband/broadband.model.js";
import fs from "fs";
import { success, failed } from "../../apis/test.js";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));
import { OrderHistory } from "../../../model/users/orderHistory.model.js"

export const GetbroadbandOptByBillerID = async (req, res) => {
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
        return res.status(200).json(new APIResponse("Broadband Operator fetched successfully!", 200, operatorIds));
    } catch (error) {
        console.log(error);

        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};
export const GetbroadbandOptList = async (req, res) => {
    try {

        const operators = Operators.filter((op) => {
            return op.Category === "Broadband"
        });

        if (operators.length == 0) {
            return res.status(400).json(new APIError("No operators found for this category", 400));
        }

        return res.status(200).json(new APIResponse("Broadband Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};
export const BroadbandOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;
        console.log(billerId);

        const operator = Operators.find(
            (op) => op.Category === "Broadband" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }

        return res.status(200).json(new APIResponse("Operator validated successfully", 200, operator));
    } catch (error) {

        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateBroadbandOperators = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Broadband" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }
        const userData = req.body;

        if (!userData) {
            return res.status(400).json(new APIError("Required Data Not Found", 400));
        }

        const userKeys = Object.keys(userData).map(k => k);

        const possibleFields = [operator.Name, operator.cn, operator.adwithregex]
            .filter(f => typeof f === "string")
            .map(f => f);


        console.log("Possible fields:", possibleFields);
        const validations = Object.entries(userData).map(([key, value]) => {
            const normalizedKey = key;
            if (possibleFields.includes(normalizedKey)) {
                const regex = new RegExp(operator.Regex);
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

        const hasInvalid = validations.some(v => !v.isValid);
        if (!hasInvalid) {
            await broadbandModel.create({
                userId: req.user.id,
                "parameter.category": "Broadband",
                "parameter.billerId": billerId,
                parameter: userData
            });
            // success();

        } else {
            // failed();
            return res.status(400).json(new APIError("One or more fields are invalid", 400, validations));
        }
        console.log({ ...operator, validateId: "abcdefgh", amout: 100 });

        return res.status(200).json(new APIResponse("Operator validated successfully", 200, { ...operator, validateId: "abcdefgh", amout: 100 }));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};




export const AddOrderHistory = async (req, res) => {
    try {
        const operatorAPIRes = ""; // call operator api

        if (!operatorAPIRes.success) {
            return res
                .status(400)
                .json(new APIError("Operator validation failed", 400));
        }

        const order = await OrderHistory.create({
            userId: req.user.id,
            userData: operatorAPIRes.data,
            paymentStatus: false
        });

        return res.status(200).json(new APIResponse("Order History Stored Successfully !", 200)
        );
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};


export const UpdatePaymentStatus = async (req, res) => {
    try {
        const paymentstatus = ""; // call payment  api
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json(new APIError("Order Id is required", 400));
        }
    
        const order = await OrderHistory.findOne({_id:orderId});
        if (!order) {
            return res.status(404).json(new APIError("Order not found", 404));
        }
        order.paymentStatus=paymentstatus.success;
        order.save();
        
        return res.status(200).json(
            new APIResponse("Payment Status Updated Successfully", 200)
        );
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};









