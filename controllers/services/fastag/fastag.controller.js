import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import fastagModel from "../../../model/services/fastag/fastag.model.js";
import fs from "fs";
import { OrderHistory } from "../../../model/users/orderHistory.model.js";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetFastagOptByBillerID = async (req, res) => {
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

        return res.status(200).json(new APIResponse("Fastag Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetFastagOperatortList = async (req, res) => {
    try {

        const operators = Operators.filter((op) => {
            return op.Category === "Fastag"
        });

        if (operators.length == 0) {
            return res.status(400).json(new APIError("No operators found for this category", 400));
        }

        return res.status(200).json(new APIResponse("Fastag Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const FastagOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Fastag" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }

        return res.status(200).json(new APIResponse("Fastag Operator", 200, operator));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateFastagOperator  = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Fastag" && op.BillerId === billerId
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
                let testResult= regex.test(String(value))
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
            await fastagModel.create({
                userId: req.user.id,
                "parameter.category": "Fastag",
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


function FastagAPI(req) {
    return {
        success: true,
        orderId: "MZXR45798XDD",
        details: req
    }
}
export const createFastagPayment = async (req, res) => {
    try {
        const order = await OrderHistory.create({
            userId: req.user.id,
            userData: userData
        });


        let response = FastagAPI(req.body);

        order.paymentStatus=response.success;
        order.save()
        return res.status(200).json(new APIResponse("Process Done",200,response));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
}







