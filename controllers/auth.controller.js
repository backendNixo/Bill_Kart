import User from "../model/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
export const GetData=async(req,res)=>{
try {
    console.log(req.body);
    console.log(res);
    const data=await User.findOne({_id:req.user.id})
    console.log(data);
    
    return res.status(200).json({msg:"data found success"})
    
} catch (error) {
    return res.status(500).json({msg:"data not found"})
}
}

const LoginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "User Name Or Password Not Found " })
        }
        const user = await User.findOne({ userName: userName });
        if (!user) {
            return res.status(400).json({ message: "User Not Found " })
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "In Correct User Credential" })
        }


        const accessToken = await generateAccessToken(user._id, user.role, req.headers["user-agent"]);
        const refreshToken = await generateRefreshToken(user._id, user.role, req.headers["user-agent"]);

        console.log(accessToken, refreshToken);

        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({
            message: "User Login Successfully!", tokens: {
                accessToken,
                refreshToken,
            },
        })

    } catch (error) {
        return res.status(500).json({ message: "Error :" + error.message })
    }
}

export{LoginUser};
