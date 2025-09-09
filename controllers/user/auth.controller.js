
import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js"




export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(new APIError("User Credentials Required", 400));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json(new APIError("User not found", 404));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json(new APIError("Invalid credentials", 401));
  }

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);
  user.refreshToken = refreshToken;
  await user.save();

  return res.status(200).json(new APIResponse("User login success fully!", 200, { Token: accessToken}));
};

export const GetProfile = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findOne({ _id: userId });
  if (!user) {
 return res.status(404).json(new APIError("User not found", 404));
  }
 return res.status(200).json(new APIResponse("User Profile :", 200,user));
};

