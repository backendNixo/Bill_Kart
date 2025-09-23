
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import OTPModel from "../../model/users/otp.model.js";



export const login = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    console.log(mobileNumber, password);

    if (!mobileNumber || !password) {
      return res.status(400).json(new APIError("User Credentials Required", 400));
    }

    const user = await User.findOne({ mobileNumber: mobileNumber })

    console.log(user);

    if (!user) {
      return res.status(404).json(new APIError("User not found", 404));
    }

    // const match = await bcrypt.compare(password, user.password);
    if (password!==user.password) {
      return res.status(401).json(new APIError("Invalid credentials", 401));
    }

    if (user.status == false) {
      return res.status(400).json(new APIError("User Status Not Active", 400));
    }
    if (user.block == true) {
      return res.status(400).json(new APIError("User Blocked", 400));
    }
    if (user.deleted == true) {
      return res.status(400).json(new APIError("User Deleted", 400));
    }
    // const otp=SendOtp();
    const otp = 1234;
    await OTPModel.create({
      mobileNumber,
      otp,
      isverified: false,
      expiresAt: Date.now() + 15 * 60 * 1000
    })
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);
    user.refreshToken = refreshToken;
    await user.save();



    return res.status(200).json(new APIResponse("User login success fully!", 200, { Token: accessToken }));
  } catch (error) {
    return res.status(500).json(new APIError("Error :" + error, 500));
  }
};

export const GetProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json(new APIError("User not found", 404));
    }
    return res.status(200).json(new APIResponse("User Profile :", 200, user));
  } catch (error) {
    return res.status(500).json(new APIError("Error :" + error, 500));
  }
};

export const UpdatePassowrd = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json(new APIError("User Id Missing", 400));
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json(new APIError("Old Password Or New Password Not Found", 400));
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json(new APIError("User Not Found", 404))
    }
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json(new APIError("Invalid Credential", 400))
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.status(200).json(new APIResponse("User Password Updated Successfully!", 200))
  } catch (error) {
    console.log(error);
    return res.status(500).json(new APIError("Error :" + error, 500))
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    if (!mobileNumber || !otp) {
      return res.status(400).json({ message: "All fields required" });
    }

    const otpExist = await OTPModel.findOne({ mobileNumber });

    if (!otpExist) {
      return res.status(400).json({ message: "Mobile Number not found" });
    }
    if (otpExist.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (otp != otpExist.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    otpExist.isverified = true;
    await otpExist.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying OTP", error });
  }
};

export const completeSetup = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json(new APIError("User Id Missing", 400));
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json(new APIError("User Not Found", 404))
    }
    user.isSetupDone = true;
    await user.save();
    return res.status(200).json(new APIResponse("Setup completed successfully!", 200))
  } catch (error) {
     console.log(error);
    return res.status(500).json(new APIError("Error :" + error, 500))
  }
};



