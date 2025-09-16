import jwt from "jsonwebtoken";
import User from "./../model/user.model.js";
import APIError from "../utils/APIError.js";

export const SetupMiddleware= async (req, res, next) => {
    try {

        const user = await User.findOne({_id:req.user.id});

        if (!user){
            return res.status(404).json(new APIError("User not found", 404));
        }

        if (!user.isSetupDone) {
            return res.status(400).json(new APIError("Please complete setup first", 400));
        }
        next();
    } catch (error) {
       return res.status(500).json(new APIError("Invalid User:" + error, 500));
    }
};
