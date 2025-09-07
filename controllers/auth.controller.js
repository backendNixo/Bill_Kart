
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {generateAccessToken,generateRefreshToken} from "../utils/generateToken.js"




export const register = async (req, res) => {
//   const username = "krati";
//   const password = "1234";
//   const role = "admin";
//   const content = "x".repeat(5 * 1024 * 1024);
  const { username, password, role,content } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, role, content });
  await user.save();
  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id, user.role);
  const refreshToken = generateRefreshToken(user._id, user.role);
  user.refreshToken = refreshToken;
  await user.save();

    console.log("login success fully!");
    
  res.json({message:"user login success fully!", accessToken, refreshToken });
};

export const refresh = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

export const Getdata = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username });


  res.json({ message: "data fetched success", data: user });
};

