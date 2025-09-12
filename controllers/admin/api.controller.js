import apiModel from "../../model/admin/api.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";

export const CreateApi = async (req, res) => {
    try {
        const { apiUrl, groupName, groupCode, successCode, failedCode } = req.body;
        if (!groupName || !groupCode || !successCode || !failedCode) {
            return res
                .status(422)
                .json(new APIError("All Fields Are Required", 422));
        }
        if (maxLimitPerTran < 0 || maxQueue < 0 || currQueue < 0) {
            return res
                .status(422)
                .json(new APIError("Numeric Fields Should Be Greater Than 0", 422));
        }
        const apiGroup = req.body.apiGroup ?? "";
        const maxLimitPerTran = req.body.maxLimitPerTran ?? 0;
        const method = req.body.method ?? "";
        const status = req.body.status ?? "";
        const liveId = req.body.liveId ?? "";
        const errorCode = req.body.errorCode ?? "";
        const message = req.body.message ?? "";
        const refKey = req.body.refKey ?? "";
        const maxQueue = req.body.maxQueue ?? 0;
        const currQueue = req.body.currQueue ?? 0;
        const resType = req.body.resType ?? "";
        const postType = req.body.postType ?? "";
        const fDelimiter = req.body.fDelimiter ?? "";
        const sDelimiter = req.body.sDelimiter ?? "";
        const transactionId = req.body.transactionId ?? "";
        await apiModel.create({
            groupName,
            groupCode,
            successCode,
            failedCode,
            apiUrl,
            apiGroup,
            maxLimitPerTran,
            method,
            status,
            liveId,
            errorCode,
            message,
            refKey,
            maxQueue,
            currQueue,
            resType,
            postType,
            fDelimiter,
            sDelimiter,
            transactionId,
            userId: req.user.id
        })
        return res.status(200).json(new APIResponse("Api Created Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
export const DeleteApi = async (req, res) => {
    try {
        const apiId = req.params.id;
        if (!apiId) {
            return res.status(400).json(new APIError("API Id Missing", 400));
        }
        const apiDeleted = await apiModel.findOneAndDelete({ _id: apiId, userId: req.user.id });
        if (!apiDeleted) {
            return res.status(400).json(new APIError("Error When Deleting API", 400));
        }
        return res.status(200).json(new APIResponse("Api Deleted Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
export const UpdateApi = async (req, res) => {
    try {
        const apiId = req.params.id;
        if (!apiId) {
            return res.status(400).json(new APIError("API Id Missing", 400));
        }
        const api = await apiModel.findOne({ _id: apiId, userId: req.user.id });
        if (!api) {
            return res.status(400).json(new APIError("API Not Found", 400));
        }
        api.successCode = req.body.successCode ?? api.successCode;
        api.failedCode = req.body.failedCode ?? api.failedCode;
        api.apiUrl = req.body.apiUrl ?? api.apiUrl;
        api.apiGroup = req.body.apiGroup ?? api.apiGroup;
        api.maxLimitPerTran = req.body.maxLimitPerTran ?? api.maxLimitPerTran;
        api.method = req.body.method ?? api.method;
        api.status = req.body.status ?? api.status;
        api.liveId = req.body.liveId ?? api.liveId;
        api.errorCode = req.body.errorCode ?? api.errorCode;
        api.message = req.body.message ?? api.message;
        api.refKey = req.body.refKey ?? api.refKey;
        api.maxQueue = req.body.maxQueue ?? api.maxQueue;
        api.currQueue = req.body.currQueue ?? api.currQueue;
        api.resType = req.body.resType ?? api.resType;
        api.postType = req.body.postType ?? api.postType;
        api.fDelimiter = req.body.fDelimiter ?? api.fDelimiter;
        api.sDelimiter = req.body.sDelimiter ?? api.sDelimiter;
        api.transactionId = req.body.transactionId ?? api.transactionId;

        await api.save();
        return res.status(200).json(new APIResponse("Api Updated Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
export const UpdateActiveStatus = async (req, res) => {
    try {
        const apiId = req.params.id;
        if (!apiId) {
            return res.status(400).json(new APIError("API Id Missing", 400));
        }
        const api = await apiModel.findOne({ _id: apiId, userId: req.user.id });
        if (!api) {
            return res.status(400).json(new APIError("API Not Found", 400));
        }
        api.isActive = req.body.isActive ?? api.isActive;
        await api.save();
        return res
            .status(200)
            .json(new APIResponse(
                "API Status Updated Successfully!",
                200,
            ));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError("Error:" + error, 500));
    }
}
export const GetAPIById = async (req, res) => {
    try {
        const apiId = req.params.id;
        if (!apiId) {
            return res.status(400).json(new APIError("API Id Missing", 400));
        }
        const api = await apiModel.findOne({ _id: apiId, userId: req.user.id });
        if (!api) {
            return res.status(400).json(new APIError("API Not Found", 400));
        }

        return res
            .status(200)
            .json(new APIResponse(
                "API Data:",
                200,
                api
            ));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError("Error:" + error, 500));
    }
}
export const GetAPIList = async (req, res) => {
    try {
        const apiList = await apiModel.find({ userId: req.user.id });
        if (apiList.length == 0) {
            return res.status(400).json(new APIError("API List Empty", 400));
        }

        return res
            .status(200)
            .json(new APIResponse(
                "API List :",
                200,
                apiList
            ));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError("Error:" + error, 500));
    }
}