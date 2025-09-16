
import OfferModel from "../../model/admin/offer.model.js";
import APIError from "../../utils/APIError.js";
import {APIResponse} from "../../utils/APIResponse.js";


const CreateOffer=async(req,res)=>{
    try {
        const {maxAmount,minAmount,offerType,offerName,offerAmount,expiryDate,offerFor}=req.body;
        if(!minAmount||!maxAmount||!offerType||!offerName||!offerAmount||!expiryDate||!offerFor){
         return res.status(400).json(new APIError("All Fields Are Required",400));
        }
        if(minAmount>=maxAmount){
          return res.status(400).json(new APIError("Max Amount Should Be Greater Than Min Amount",400));
        }
        if(minAmount<0||maxAmount<0){
            return res.status(400).json(new APIError("Min Amount Or Max Amount Should Be Greater Than 0",400));
        }
        await OfferModel.create({
            minAmount,
            maxAmount,
            offerType,
            offerName,
            offerAmount,
            expiryDate,
            offerFor,
            userId:req.user.id
        })
        return res.status(200).json(new APIResponse("Offer Created Successfully!",200))
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new APIError("Error : ",+error,500));
    }
}

const DeleteOffer=async(req,res)=>{
    try {
        const offerId=req.params.id;

        if(!offerId){
            return res.status(400).json(new APIError("Offer Id Missing",400));
        }
        const isDeleted=await OfferModel.findOneAndDelete({_id:offerId,userId:req.user.id});
        if(!isDeleted){
           return res.status(400).json(new APIError("Error Occure When Deleting Offer",400));
        }
        return res.status(200).json(new APIResponse("Offer Deleted Successfully!",200))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ",+error,500));
    }
}

const UpdateOffer=async(req,res)=>{
    try {
        const offerId=req.params.id;

        if(!offerId){
            return res.status(400).json(new APIError("Offer Id Missing",400));
        }
        const offer=await OfferModel.findOneAndDelete({_id:offerId,userId:req.user.id});
        if(!offer){
           return res.status(400).json(new APIError("Offer Not Exist",400));
        }
        offer.minAmount=req.body.minAmount??offer.minAmount;
        offer.maxAmount=req.body.maxAmount??offer.maxAmount;
        offer.offerType=req.body.offerType??offer.offerType;
        offer.offerAmount=req.body.offerAmount??offer.offerAmount;
        offer.offerName=req.body.offerName??offer.offerName;
        offer.expiryDate=req.body.expiryDate??offer.expiryDate;

        await offer.save();

        return res.status(200).json(new APIResponse("Offer Updated Successfully!",200))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ",+error,500));
    }
}

const GetOfferById=async(req,res)=>{
    try {
        const offerId=req.params.id;
        if(!offerId){
              return res.status(400).json(new APIError("Offer Id Missing",400));
        }
        const Offer=await OfferModel.find({_id:offerId,userId:req.user.id});
       if(!Offer){
        return res.status(400).json(new APIError("Offer Not Found",400));
       }
        return res.status(200).json(new APIResponse("Offer Show Successfully!",200,Offer))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ",+error,500));
    }
}


const GetOfferList=async(req,res)=>{
    try {
        
        const Offers=await OfferModel.find({userId:req.user.id});
        if(Offers.length==0){
             return res.status(400).json(new APIError("Offer List Empty",400));
        }
        return res.status(200).json(new APIResponse("Offer Show Successfully!",200,Offers))
    } catch (error) {
        return res.status(500).json(new APIError("Error : ",+error,500));
    }
}


export{
    CreateOffer,
    DeleteOffer,
    UpdateOffer,
    GetOfferList,
    GetOfferById
};