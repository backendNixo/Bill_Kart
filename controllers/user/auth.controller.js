
import userModel from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js"




export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    console.log(userName,password);
    
  if (!userName || !password) {
    return res.status(400).json(new APIError("User Credentials Required", 400));
  }

  const user = await userModel.findOne({userName:userName})

  console.log(user);
  
  if (!user) {
    return res.status(404).json(new APIError("User not found", 404));
  }

  // const match = await bcrypt.compare(password, user.password);
  // if (!match) {
  //   return res.status(401).json(new APIError("Invalid credentials", 401));
  // }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(200).json(new APIResponse("User login success fully!", 200, { Token: accessToken }));
  } catch (error) {
    return res.status(500).json(new APIError("Error :"+error, 500));
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
   return res.status(500).json(new APIError("Error :"+error, 500));
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
