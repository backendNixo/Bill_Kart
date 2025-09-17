import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import WaterSuply from "../../../model/services/waterSuply/waterSuply.model.js"
import fs from "fs"; 
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetWaterSuplyOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("BillerId required", 400));
        }

        const operator = await WaterSuply.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("WaterSuply Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetWaterSuplyOperatortList = async (req, res) => {
    try {
        const optCategory = req.params.category;
        if (!optCategory) {
            return res.status(400).json(new APIError("Operator Category required", 400));
        }

        const operators = Operators.filter((op) => {
            return op.Category === optCategory
        });

        if (!operators.length) {
            return res.status(404).json({
                success: false,
                message: "No operators found for this category",
            });
        }

        return res.status(200).json(new APIResponse("WaterSuply Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateWaterSuplyOperator = async (req, res) => {
    try {
        const { category, billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === category && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(404).json({
                success: false,
                message: "Invalid operator",
            });
        }

        const userData = req.body;

        const validations = Object.entries(userData).map(([key, value]) => {
            const regex = new RegExp(operator.Regex);
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
            await WaterSuply.create({
                userId: req.user.id,
                "parameter.category": category,
                "parameter.billerId": billerId,
                parameter: userData,
            });

            return res.status(400).json({
                success: false,
                message: "One or more fields are invalid",
                details: validations,
                saved: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Operator validated successfully",
            operator,
            data: userData,
        });
    } catch (error) {

        console.log(error);

        return res.status(500).json({ success: false, error: error.message });
    }
};