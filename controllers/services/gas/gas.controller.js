import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import gasModel from "../../../model/services/gas/gas.model.js";
import fs from "fs";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetGasOptByBillerID = async (req, res) => {
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

        return res.status(200).json(new APIResponse("Gas Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetGasOperatortList = async (req, res) => {
    try {

        const operators = Operators.filter((op) => {
            return op.Category === "Gas"
        });


        if (operators.length == 0) {
            return res.status(400).json(new APIError("No operators found for this category", 400));
        }

        return res.status(200).json(new APIResponse("GAS Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GasOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Gas" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }

        return res.status(200).json(new APIResponse("Gas Operator", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateGasOperator  = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Gas" && op.BillerId === billerId
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
            await gasModel.create({
                userId: req.user.id,
                "parameter.category": "Gas",
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



