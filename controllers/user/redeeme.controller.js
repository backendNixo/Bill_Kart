import RedeemeModel from "../../model/users/redeeme.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";
import Offer from "../../model/admin/offer.model.js";

const addRedeeme=async(req,res)=>{
    try {
        const offerName=req.params.offername;
        if(!offerName){
             return res.status(500).json(new APIError("Offer Name Not Found",400));
        }
        const offer=await Offer.findOne({offerName:offerName});
        if(!offer){
            return res.status(500).json(new APIError("Offer Not Found",400));
        }
        await RedeemeModel.create({
            offerId:offer._id,
            userId:offer.userId,
            transactionId:"gftrrtrtrbmm"
        })
        return res.status(200).json(new APIResponse("Redeeme Created Successfully!",200));
    } catch (error) {
        return res.status(500).json(new APIError("Error :"+error,500));
    }
}

export {addRedeeme};