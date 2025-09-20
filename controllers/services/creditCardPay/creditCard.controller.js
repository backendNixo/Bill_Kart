import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import creditCardModel from "../../../model/services/creditCardPay/creditCard.model.js";
import fs from "fs";

const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetCreditOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("BillerId required", 400));
        }

        const operator = await creditCardModel.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("Credit Card Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetCreditOperatortList = async (req, res) => {
    try {
       
        const operators = Operators.filter((op) => {
           return op.Category === "creditcardpay"
        });

        if (!operators.length) {
            return res.status(404).json({
                success: false,
                message: "No operators found for this category",
            });
        }

        return res.status(200).json(new APIResponse("Credit Card Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const CreditOperatorConfig = async (req, res) => {
    try {
        const {billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "creditcardpay" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(404).json({
                success: false,
                message: "Invalid operator",
            });
        }
        return res.status(200).json({
            success: true,
            message: "creditcardpay Operator",
            operator
        });
    } catch (error) {

        console.log(error);

        return res.status(500).json({ success: false, error: error.message });
    }
};

export const ValidateCreditOperator = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "creditcardpay" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(404).json({
                success: false,
                message: "Invalid operator",
            });
        }
        const userData = req.body;

        const validations = Object.entries(userData).map(([key, value]) => {
            const cleanValue = String(value).trim();
            if(value!==operator[key]){
                return false;
            }
            
             return {
                field: key,
                value: cleanValue,
                isValid:true,
            };
        });

        console.log(validations);
        const hasInvalid = validations.some(v => !v.isValid);
        if (hasInvalid) {
            await creditCardModel.create({
                userId: req.user.id,
                "parameter.category": "creditcardpay",
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


        






