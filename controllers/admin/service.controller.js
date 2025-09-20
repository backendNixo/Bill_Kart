import { set } from "mongoose";
import serviceModel from "../../model/admin/service.model.js";
import userModel from "../../model/user.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";


export const CreateService = async (req, res) => {
    try {
        const { name, allowedUsers = [] } = req.body;

        if (!name) {
            return res.status(400).json(new APIError("Service Name Required", 400));
        }

        console.log(name, "       ", allowedUsers);

        const description = req.body.description ?? "";
        const isActive = req.body.isActive ?? false;

        let usersId = [];
        if (Array.isArray(allowedUsers) && allowedUsers.length > 0) {
            // const users = await userModel.find({ userName: { $in: allowedUsers } });
            usersId = allowedUsers.map((u) => u._id);
        } else {
            return res.status(400).json(new APIError("Empty List", 400));
        }
        console.log(usersId);

        await serviceModel.create({
            name,
            description,
            isActive,
            allowedUsers: usersId,
            adminId: req.user.id,
        });

        return res
            .status(200)
            .json(new APIResponse("Service Created Successfully!", 200));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError("Error :" + error.message, 500));
    }
};
export const GetServiceList = async (req, res) => {
    try {
        const serviceList = await serviceModel.find({ adminId: req.user.id });
        if (serviceList.length == 0) {
            return res.status(404).json(new APIError("No Services Found", 404));
        }

        return res.status(200).json(new APIResponse("Services List Fetched Successfully!", 200, serviceList));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}
export const GetServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceModel.findOne({ _id: serviceId, adminId: req.user.id });
        if (!service) {
            return res.status(404).json(new APIError("No Service Found", 404));
        }

        return res.status(200).json(new APIResponse("Service By Id Fetched Successfully!", 200, service));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}
export const DeleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const isDeleted = await serviceModel.findOneAndDelete({ _id: serviceId, adminId: req.user.id });

        if (!isDeleted) {
            return res.status(400).json(new APIError("Service Not Deleted", 400));
        }

        return res.status(200).json(new APIResponse("Service Deleted Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}
export const UpdateServiceStatus = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceModel.findOne({ _id: serviceId, adminId: req.user.id });
        if (!service) {
            return res.status(404).json(new APIError("No Service Found", 404));
        }
        service.isActive = req.body.isActive ?? service.isActive;

        await service.save();
        return res.status(200).json(new APIResponse("Service  Status Updated Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}

//Update service name ,description ,add users


export const UpdateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceModel.findOne({ _id: serviceId, adminId: req.user.id });

        if (!service) {
            return res.status(404).json(new APIError("No Service Found", 404));
        }

        service.name = req.body.name ?? service.name;
        service.description = req.body.description ?? service.description;

        if (req.body.allowedUsers) {

            const usersToAdd = Array.isArray(req.body.allowedUsers)
                ? req.body.allowedUsers
                : [req.body.allowedUsers];

            service.allowedUsers = [
                ...new Set([...service.allowedUsers.map(u => u.toString()), ...usersToAdd]),
            ];
        }

        await service.save();

        return res
            .status(200)
            .json(new APIResponse("Service Updated Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error.message, 500));
    }
};

export const AllowServicePermission = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await serviceModel.findOne({ _id: serviceId, adminId: req.user.id });

        if (!service) {
            return res.status(404).json(new APIError("No Service Found", 404));
        }

        if (req.body.allowedUsers) {
            const usersToAdd = Array.isArray(req.body.allowedUsers)
                ? req.body.allowedUsers
                : [req.body.allowedUsers];

            service.allowedUsers = [
                ...new Set([...service.allowedUsers.map(u => u.toString()), ...usersToAdd]),
            ];
        }

        await service.save();

        return res
            .status(200)
            .json(new APIResponse("New Users Added To Service Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error.message, 500));
    }
};

export const removeServicePermission = async (req, res) => {
    try {
        const serviceId = req.params.serviceid;
        const userId = req.params.userid;
        if (!serviceId) {
            return res.status(400).json(new APIError("Service Id Missing", 400));
        }
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }
        const service = await serviceModel.findOneAndUpdate(
            { _id: serviceId },
            { $pull: { allowedUsers: userId } },
            { new: true }
        ).populate("allowedUsers", "_id");
        if (!service) {
            return res.status(404).json(new APIError("Service not found", 404));
        }
        return res
            .status(200)
            .json(new APIResponse("User removed from service successfully ", 200, service));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError("Error :" + error.message, 500));
    }
};

export const UserNameList = async (req, res) => {
    try {
        const serviceList = await serviceModel
            .findOne({ adminId: req.user.id })
            .populate("allowedUsers", "userName");

        if (!serviceList) {
            return res.status(404).json(new APIError("No Services Found", 404));
        }

        const userList = serviceList.allowedUsers.map(u => ({
            id: u._id,
            userName: u.userName,
        }));

        return res
            .status(200)
            .json(new APIResponse("Services Users Name List Fetched Successfully!", 200, userList));
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
};






