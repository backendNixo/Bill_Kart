import OfferModel from "../../model/admin/offer.model.js";
import userModel from "../../model/user.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";


const ShowUOffersBasedOnOfferFor = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json(new APIError("User Not Found", 404));
        }
        const offerFor = req.body.offerFor;
        if (!offerFor) {
            return res.status(400).json(new APIError("OfferFor Not Found", 400));
        }
        const offer = await OfferModel.find({ offerFor: offerFor });
        if (!offer) {
            return res.status(404).json(new APIError("Offer Not Found", 404));
        }
       return res.status(200).json(new APIResponse("Offers Shows Successfully!", 200, offer));
       
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}
const ShowUOffers = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json(new APIError("User Not Found", 404));
        }
      
        const diff = Date.now()-Date.parse(user.createdAt);
         console.log(diff);
         
        let offers;
        if(diff >= 60 * 1000){
          offers=await OfferModel.find({offerFor:"old-user"});
        }
        else if(diff <= 60 * 1000){
          offers=await OfferModel.find({offerFor:"new-user"});
        }
       return res.status(200).json(new APIResponse("Offers Shows Successfully!", 200, offers));
       
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}

export { ShowUOffersBasedOnOfferFor,ShowUOffers };