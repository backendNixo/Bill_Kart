
import AdminModel from "../../model/admin/admin.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";


export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            return res.status(400).json(new APIError("Admin not found", 400))
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(400).json(new APIError("Invalid credentials", 400))
        }

        const Token = generateToken(admin._id);

        return res.status(200).json(new APIResponse("Admin Login Successfully!", 200, Token))
    } catch (error) {
        console.log(error);

        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const UpdatePassowrd = async (req, res) => {
    try {
        const adminId = req.user.id;
        if (!adminId) {
            return res.status(400).json(new APIError("Admin Id Missing", 400));
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json(new APIError("Old Password Or New Password Not Found", 400));
        }

        const admin = await AdminModel.findOne({ _id: adminId });
        if (!admin) {
            return res.status(404).json(new APIError("Admin Not Found", 404))
        }
        const match = await bcrypt.compare(oldPassword, admin.password);
        if (!match) {
            return res.status(400).json(new APIError("Invalid Credential", 400))
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        return res.status(200).json(new APIResponse("Admin Password Updated Successfully!", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}
export const UpdateAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        if (!adminId) {
            return res.status(400).json(new APIError("Admin Id Missing", 400));
        }
        const { username } = req.body;
        if (!username) {
            return res.status(400).json(new APIError("User Name Not Found", 400));
        }

        const admin = await AdminModel.findOne({ _id: adminId });
        if (!admin) {
            return res.status(404).json(new APIError("Admin Not Found", 404));
        }
        if (admin.username === username) {
            admin.username = username;
        }
        else {
            const adminExist = await AdminModel.find({ username: username });
            if (adminExist) {
                return res.status(404).json(new APIError("User Name Already Exist", 404))
            }
        }
        await admin.save();
        return res.status(200).json(new APIResponse("Admin Password Updated Successfully!", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}
export const GetAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        if (!adminId) {
            return res.status(400).json(new APIError("Admin Id Missing", 400));
        }
        const admin = await AdminModel.findOne({ _id: adminId });
        if (!admin) {
            return res.status(404).json(new APIError("Admin Not Found", 404));
        }

        return res.status(200).json(new APIResponse("Admin Profile :", 200, admin))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}