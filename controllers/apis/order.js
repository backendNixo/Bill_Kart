
import { APIResponse } from "../../utils/APIResponse.js";
import APIError from "../../utils/APIError.js";


function forSampleRecharge(req) {
    return {
        success: true,
        orderId: "MZXR45798XDD",
        details: req
    }
}

// cretae payment initail procss
export const createPayment = async (req, res) => {
    try {
        const order = await OrderHistory.create({
            userId: req.user.id,
            userData: userData
        });


        let response = forSampleRecharge(req.body);

        order.paymentStatus=response.success;
        order.save()



        // const apiRes = "";
        // if (apiRes.success) {
        //     order.paymentStatus = paymentstatus.success;
        //     order.save();
        // }
        return res.status(200).json(new APIResponse("Process Done",200,response));

    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
}