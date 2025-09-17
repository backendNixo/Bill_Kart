import NotificationModel from "../../model/admin/notification.model.js";
import NotificationRead from "../../model/admin/notificationRead.model.js";
import UserModel from "../../model/user.model.js"
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";

const CreateNotification = async (req, res) => {
    try {
        const { header, body, notificationFor, selectedUsers } = req.body;
        if (!header || !body || !notificationFor) {
            return res.status(400).json(new APIError("All Fields Are Required", 400));
        }
        let userIds = [];
        if (notificationFor === 'selected') {
            if (!Array.isArray(selectedUsers) || selectedUsers.length === 0) {
                return res.status(400).json(new APIError("Please Select Users", 400));
            }

            const users = await UserModel.find({ userName: { $in: selectedUsers } });
            if (!users || users.length == 0) {
                return res.status(400).json(new APIError("Please Select Users", 400));
            }
            userIds = users.map(u => u._id);
        }
        await NotificationModel.create({
            header,
            body,
            notificationFor,
            isSeen: false,
            adminId: req.user.id,
            selectedUsers: userIds
        })
        return res.status(200).json(new APIResponse("Notification Created Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
const DeleteNotification = async (req, res) => {
    try {
        const id = req.params.id;//notification id
        if (!id) {
            return res.status(400).json(new APIError("Notification Id Missing", 400));
        }
        const DeleteNotification = await NotificationModel.findOneAndDelete({ _id: id, adminId: req.user.id });
        if (!DeleteNotification) {
            return res.status(400).json(new APIError("Error When Delete Notification", 400));
        }
        return res.status(200).json(new APIResponse("Notification Deleted Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
const UpdateNotification = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json(new APIError("Notification Id Missing", 400));
        }
        const notification = await NotificationModel.findOne({ _id: id, adminId: req.user.id });
        if (!notification) {
            return res.status(400).json(new APIError("Notification Not Found", 400));
        }
        notification.header = req.body.header ?? notification.header;
        notification.body = req.body.body ?? notification.body;
        notification.notificationFor = req.body.notificationFor ?? notification.notificationFor;

        await notification.save();
        return res.status(200).json(new APIResponse("Notification Updated Successfully!", 200));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
const GetNotificationList = async (req, res) => {
    try {
        const notificationList = await NotificationModel.find({ adminId: req.user.id });
        if (notificationList.length == 0) {
            return res.status(400).json(new APIError("Notification List Empty", 400));
        }

        return res.status(200).json(new APIResponse("Notification List Fetched Successfully!", 200, notificationList));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
const GetNotificationBasedOnType = async (req, res) => {
    try {
        const { notificationfor } = req.body;
        if (!notificationfor) {
            return res.status(400).json(new APIError("Please Select Type Of Notification", 400));
        }

        const notificationList = await NotificationModel.find({ adminId: req.user.id, notificationFor: notificationfor });

        if (!notificationList.length == 0) {
            return res.status(400).json(new APIError("Notification List Empty", 400));
        }

        return res.status(200).json(new APIResponse("Notification List Fetched Successfully!", 200, notificationList));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}
const SendNotificationToUser = async (req, res) => {
    try {
        const notificationid = req.params.id;
        if (!notificationid) {
            return res.status(400).json(new APIError("Notification Id Missing", 400));
        }
        
        const notification = await NotificationRead.findOne({ notificationId: notificationid,userId:req.user.id});
        if(notification.isSeen == true){
             return res.status(400).json(new APIError("Notification Already Seen", 400));
        }

        await NotificationRead.create({
            notificationId:notificationid,
            userId:req.user.id,
            isSeen:true
        })
      
        return res.status(200).json(new APIResponse(`Notification Seen Successfully!`, 200,notification));
    } catch (error) {
        return res.status(500).json(new APIError("Error : " + error, 500));
    }
}


export {
    CreateNotification,
    DeleteNotification,
    UpdateNotification,
    GetNotificationList,
    GetNotificationBasedOnType,
    SendNotificationToUser,
};