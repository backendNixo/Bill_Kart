
import AdminModel from "../../model/admin/admin.model.js";
import userModel from "../../model/user.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../../utils/generateToken.js";
import { OperatorLadger } from "../../model/users/paymentLedger.model.js"
import { success } from "../apis/test.js";
import fs from "fs";
const Operators = JSON.parse(fs.readFileSync("./operators.json"));

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
            adminId: req.user.id
        })

        return res.status(200).json(new APIResponse("User Created Successfully!", 200))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

export const GetUsersList = async (req, res) => {
    try {
        const usersList = await userModel.find({ adminId: req.user.id });

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

        const user = await userModel.findOne({ _id: userId, adminId: req.user.id });

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
        const user = await userModel.findOne({ _id: userId, adminId: req.user.id });

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

        const isDeleted = await userModel.findOneAndDelete({ _id: userId, adminId: req.user.id });

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

        const user = await userModel.findOne({ _id: userId, adminId: req.user.id });
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

        const user = await userModel.findOne({ _id: userId, adminId: req.user.id });

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

        const user = await userModel.findOne({ _id: userId, adminId: req.user.id });

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
        const usersNameList = await userModel.find({ adminId: req.user.id }, { userName: 1 });

        if (usersNameList.length == 0) {
            return res.status(400).json(new APIError("Users List Empty", 400));
        }

        return res.status(200).json(new APIResponse("Users Names List :", 200, usersNameList))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error, 500))
    }
}

//ledger list
export const ViewUserLedgerByAdmin = async (req, res) => {
    try {
        const { startDate, endDate } = req.body || {};
        let start, end;

        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }
        const users = await userModel.find({ adminId: req.user.id });

        if (!users || users.length === 0) {
            return res.status(400).json(new APIError("No users found for this admin", 400));
        }

        const userIds = users.map(u => u._id);


        const ledgers = await OperatorLadger.find({
            userId: { $in: userIds },
            createdAt: { $gte: start, $lte: end }
        }).sort({ createdAt: -1 });


        if (ledgers.length === 0) {
            return res.status(400).json(new APIError("Users Ledgers List Empty", 400));
        }

        const totalpayment = ledgers.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );
        const totaloffer = ledgers.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );

        const list = {
            ledgers: ledgers,
            totalpayment,
            totaloffer
        };

        return res.status(200).json(new APIResponse("Users Ledgers List :", 200, list));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error.message, 500));
    }
};

//show seven day old data in graph
export const ViewUserLedger7DayOldByAdmin = async (req, res) => {
    try {
        const todayDate = new Date();
        const sevenDaysAgo = new Date(todayDate.getTime() - 7 * 24 * 60 * 60 * 1000);

        let Totalsuccess = 0;
        let Totalfailed = 0;
        let Totalpending = 0;
        const users = await userModel.find({ adminId: req.user.id }, "_id");

        // if (!users || users.length === 0) {
        //     return res.status(400).json(new APIError("No users found for this admin", 400));
        // }

        const userIds = users.map(u => u._id);


        const ledgers = await OperatorLadger.find({
            userId: { $in: userIds },
            createdAt: { $gte: sevenDaysAgo, $lte: todayDate }
        }).sort({ createdAt: -1 });


        // if (!ledgers || ledgers.length === 0) {
        //     return res.status(400).json(new APIError("Users List Empty", 400));
        // }

        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayWiseCounts = {};
        weekdays.forEach(day => {
            dayWiseCounts[day] = { success: 0, pending: 0, failed: 0 };
        });

        ledgers.forEach(ledger => {
            const dayName = new Date(ledger.createdAt).toLocaleString("en-US", { weekday: "long" });

            if (ledger.status === "success") {
                Totalsuccess++;
                dayWiseCounts[dayName].success++;
            }
            else if (ledger.status === "pending") {
                Totalpending++;
                dayWiseCounts[dayName].pending++;
            }
            else {
                Totalfailed++;
                dayWiseCounts[dayName].failed++;
            }
        });


        const chartData = weekdays.map(day => ({
            day,
            ...dayWiseCounts[day]
        }));

        // return res
        //     .status(200)
        //     .json(new APIResponse("Admin Users Ledgers in Last 7 Days :", 200,
        //  {..chartData,Totalsuccess:Totalsuccess,Totalpending:Totalpending,Totalfailed:Totalfailed}));
        return res
            .status(200)
            .json(new APIResponse("Admin Users Ledgers in Last 7 Days :", 200, [
                { "day": "Sunday", "success": 4, "pending": 1, "failed": 0 },
                { "day": "Monday", "success": 2, "pending": 3, "failed": 1 },
                { "day": "Tuesday", "success": 5, "pending": 0, "failed": 2 },
                { "day": "Wednesday", "success": 1, "pending": 2, "failed": 0 },
                { "day": "Thursday", "success": 3, "pending": 1, "failed": 1 },
                { "day": "Friday", "success": 0, "pending": 0, "failed": 0 },
                { "day": "Saturday", "success": 6, "pending": 1, "failed": 2 },
                { "Totalsuccess": 20, "Totalpending": 10, "Totalfailed": 2 }
            ]));


    } catch (error) {
        console.error(error);
        return res.status(500).json(new APIError("Error :" + error.message, 500));
    }
};

//filter user based on operator type
export const ViewLedgerBasedOnOpt = async (req, res) => {
    try {
        const optType = req.params.optType;

        const { startDate, endDate } = req.body || {};

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }
        const users = await userModel.find({ adminId: req.user.id });

        if (!users || users.length === 0) {
            return res.status(400).json(new APIError("No users found for this admin", 400));
        }

        const userIds = users.map(u => u._id);


        const ledgers = await OperatorLadger.find({
            userId: { $in: userIds },
            createdAt: { $gte: start, $lte: end },
            category: optType
        }).sort({ createdAt: -1 });



        if (ledgers.length === 0) {
            return res.status(400).json(new APIError("Users Ledgers List Empty", 400));
        }

        const totalpayment = ledgers.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );
        const totaloffer = ledgers.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );
        const list = {
            ...ledgers,
            totaloffer,
            totalpayment
        }
        return res.status(200).json(new APIResponse(`${optType} Ledger List `, 200, list));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

//filter user based on status
export const ViewSuccessOrFailedLedger = async (req, res) => {
    try {
        const optStatus = req.params.status;

        const { startDate, endDate } = req.body || {};

        let start, end;
        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }

        const users = await userModel.find({ adminId: req.user.id });

        if (!users || users.length === 0) {
            return res.status(400).json(new APIError("No users found for this admin", 400));
        }

        const userIds = users.map(u => u._id);


        const ledgers = await OperatorLadger.find({
            userId: { $in: userIds },
            createdAt: { $gte: start, $lte: end },
            status:optStatus
        }).sort({ createdAt: -1 });



        if (ledgers.length === 0) {
            return res.status(400).json(new APIError("Users Ledgers List Empty", 400));
        }

        const totalpayment = ledgers.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );

        const totaloffer = ledgers.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );

        const list = {
            ...ledgers,
            totaloffer,
            totalpayment
        }
        return res.status(200).json(new APIResponse(`All ${optStatus} Ledger List`, 200, list));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};

//get ledger list by userid
export const ViewUserLedgerByUserId = async (req, res) => {
    try {
        const { startDate, endDate } = req.body || {};
        let start, end;

        if (startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }
        const userId=req.params.id;
        if(!userId){
            return res.status(400).json(new APIError("User ID Not Found", 400));
        }
        const users = await userModel.findOne({ _id:userId,adminId: req.user.id });

        if (!users || users.length === 0) {
            return res.status(400).json(new APIError("No users found for this admin", 400));
        }

    


        const ledgers = await OperatorLadger.find({
            userId: userId,
            createdAt: { $gte: start, $lte: end }
        }).sort({ createdAt: -1 });



        if (ledgers.length === 0) {
            return res.status(400).json(new APIError("Users Ledgers List Empty", 400));
        }

        const totalpayment = ledgers.reduce(
            (sum, document) => sum + (document.paymentAmount || 0),
            0
        );
        const totaloffer = ledgers.reduce(
            (sum, document) => sum + (document.offerAmount || 0),
            0
        );

        const list = {
            ledgers: ledgers,
            totalpayment,
            totaloffer
        };

        return res.status(200).json(new APIResponse("Users Ledgers List :", 200, list));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new APIError("Error :" + error.message, 500));
    }
};

//get operatorlist
 export const GetOperatorList=async (req, res) => {
  try {
    let operators=new Set();
    Operators.map((opt)=>{
       operators.add(opt.Category);
    })

    const operatorList=Array.from(operators);
    return res
      .status(200)
      .json(new APIResponse("Operator Name List", 200, operatorList));

  } catch (error) {
    console.error(error);
    return res.status(500).json(new APIError("Error :" + error.message, 500));
  }
};







