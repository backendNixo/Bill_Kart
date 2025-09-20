import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import loanRepaymentModel from "../../../model/services/LoanRepayment/Loan.model.js"
import fs from "fs";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));


export const GetLoanRepaymentOptByBillerID = async (req, res) => {
    try {
        const billerId = req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("BillerId required", 400));
        }

        const operator = await loanRepaymentModel.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("Loan Repayment Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const GetLoanRepaymentOperatortList = async (req, res) => {
    try {

        const operators = Operators.filter((op) => {
            return op.Category === "Loan Repayment"
        });

        if (operators.length == 0) {
            return res.status(400).json(new APIError("No operators found for this category", 400));
        }

        return res.status(200).json(new APIResponse("Loan Repayment Operator fetched successfully!", 200, operators));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const LoanRepaymentOperatorConfig = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Loan Repayment" && op.BillerId === billerId
        );

        if (!operator) {
            return res.status(400).json(new APIError("Invalid operator", 400));
        }

        return res.status(200).json(new APIResponse("Loan Repayment Operator", 200, operator));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

export const ValidateLoanRepaymentOperator = async (req, res) => {
    try {
        const { billerId } = req.params;

        const operator = Operators.find(
            (op) => op.Category === "Loan Repayment" && op.BillerId === billerId
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
            await loanRepaymentModel.create({
                userId: req.user.id,
                "parameter.category": "Loan Repayment",
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








