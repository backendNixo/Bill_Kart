import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import datacardModel from "../../../model/services/datacardPrepaid/datacard.model.js";
import fs from "fs";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetDataOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("BillerId required", 400));
        }

        const operator = await datacardModel.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("Data Card Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetDataOperatortList = async (req, res) => {
    try {

        const operators = Operators.filter((op) => {
            return op.Category === "Datacard Prepaid"
        });

        if (!operators.length) {
            return res.status(400).json(new APIError("No operators found for this category", 400));
        }

        return res.status(200).json(new APIResponse("Data Card Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};


export const DatacardOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Datacard Prepaid" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }
        return res.status(200).json(new APIResponse("Datacard Prepaid Operator", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateDataOperator = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Datacard Prepaid" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }
        const userData = req.body;

        const validations = Object.entries(userData).map(([key, value]) => {
            const cleanValue = String(value).trim();
            if (value !== operator[key]) {
                return false;
            }

            return {
                field: key,
                value: cleanValue,
                isValid: true,
            };
        });

        console.log(validations);
        const hasInvalid = validations.some(v => !v.isValid);
        if (hasInvalid) {
            await datacardModel.create({
                userId: req.user.id,
                "parameter.category": "Datacard Prepaid",
                "parameter.billerId": billerId,
                parameter: userData,
            });

            return res.status(400).json(new APIError("One or more fields are invalid", 400, validations));
        }
        return res.status(200).json(new APIResponse("Operator validated successfully", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};








