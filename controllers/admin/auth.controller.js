
import AdminModel from "../../model/admin/admin.model.js";
import userModel from "../../model/user.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../utils/generateToken.js";



//ADMIN ROUTES==========================================================


export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await AdminModel.findOne({ username });
        if (!admin) {
            return res.status(400).json(new APIError("Admin not found", 400))
        }

        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            return res.status(400).json(new APIError("Invalid credentials", 400))
        }

        const Token = generateAccessToken(admin._id, admin.role);

        return res.status(200).json(new APIResponse("Admin Login Successfully!", 200, { Token: Token }))
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

        admin.username = username;
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


//USER ROUTES =========================================================


export const CreateUser = async (req, res) => {
    try {
        const { userName, mobileNumber, password } = req.body;

        if (!userName || !mobileNumber || !password) {
            return res.status(400).json(new APIError("Please Fill All Required Fileds", 400))
        }
        
        const isExist = await userModel.findOne({ userName: userName, mobileNumber: mobileNumber });
        
        if (isExist) {
            return res.status(400).json(new APIError("User with this username or mobile number already exist", 400))
        }
         

        await userModel.create({
            userName: userName,
            mobileNumber: mobileNumber,
            password: password,
            role: "user",
            refreshToken: "",
            content: "",
            status: req.body.status ?? false,
            block: req.body.block ?? false,
            deleted: req.body.deleted ?? false,
            isSetupDone: req.body.isSetupDone ?? false,
            adminId:req.user.id
        })

        return res.status(200).json(new APIResponse("User Created Successfully!", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const GetUsersList = async (req, res) => {
    try {
        const usersList = await userModel.find({adminId:req.user.id});

        if (usersList.length == 0) {
            return res.status(400).json(new APIError("Users List Empty", 400));
        }

        return res.status(200).json(new APIResponse("Users List :", 200, usersList))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const GetUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }

        const user = await userModel.findOne({ _id: userId,adminId:req.user.id });

        if (!user) {
            return res.status(404).json(new APIError("User Not Found", 404));
        }

        return res.status(200).json(new APIResponse("User Profile :", 200, user))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const UpdateUserPassword = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json(new APIError("Old Password Or New Password Not Found", 400));
        }
        const user = await userModel.findOne({ _id: userId,adminId:req.user.id });

        if (!user) {
            return res.status(404).json(new APIError("User Not Found", 404));
        }
        console.log();

        //  const match= await bcrypt.compare(oldPassword,user.password);
        if (oldPassword !== user.password) {
            return res.status(400).json(new APIError("Invalid Credential", 400));
        }
        //  const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password = newPassword;
        await user.save();
        return res.status(200).json(new APIResponse("User Password Updated Successfully!", 200));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }

        const isDeleted = await userModel.findOneAndDelete({ _id: userId ,adminId:req.user.id});

        if (!isDeleted) {
            return res.status(400).json(new APIError("Error Occure When Deleting User", 400));
        }

        return res.status(200).json(new APIResponse("User Deleted Successfully!", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const UpdateUserStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }

        const user = await userModel.findOne({ _id: userId,adminId:req.user.id });
        console.log(user);

        if (!user) {
            return res.status(400).json(new APIError("User Not Found", 400));
        }
        user.status = req.body.status ?? user.status;

        await user.save();
        return res.status(200).json(new APIResponse("User Status Updated Successfully!", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const BlockUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }

        const user = await userModel.findOne({ _id: userId,adminId:req.user.id });

        if (!user) {
            return res.status(400).json(new APIError("User Not Found", 400));
        }

        user.block = req.body.block ?? user.block;
        await user.save();
        return res.status(200).json(new APIResponse("User Blocked Successfully!", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const DeletedUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json(new APIError("User Id Missing", 400));
        }

        const user = await userModel.findOne({ _id: userId ,adminId:req.user.id});

        if (!user) {
            return res.status(400).json(new APIError("User Not Found", 400));
        }

        user.deleted = req.body.deleted ?? user.deleted;
        await user.save();
        return res.status(200).json(new APIResponse("User Deleted Successfully!", 200))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const GetAllUserNameList = async (req, res) => {
    try {
        const usersNameList = await userModel.find({adminId:req.user.id}, { userName: 1 });

        if (usersNameList.length == 0) {
            return res.status(400).json(new APIError("Users List Empty", 400));
        }

        return res.status(200).json(new APIResponse("Users Names List :", 200, usersNameList))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}


