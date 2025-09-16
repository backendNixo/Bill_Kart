import APIError from "../../../utils/APIError.js";
import { APIResponse } from "../../../utils/APIResponse.js";
import datacardModel from "../../../model/services/datacardPrepaid/datacard.model.js";


export const GetDataCardOptByBillerID = async (req, res) => {
    try {
       const billerId=req.params.billerId;
        if (!billerId) {
            return res.status(400).json(new APIError("Biller Id required", 400));
        }
        
        const operator = await datacardModel.findOne({ "parameter.billerId": billerId });

        return res.status(200).json(new APIResponse("Data Card Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};


export const GetDataCardOperator = async (req, res) => {
    try {
     const { operatorName,category,regex} = req.body;

        if (!operatorName || !category) {
            return res.status(400).json(new APIError("Name and  Operator Catergory are required", 400));
        }
        
        let operator = null;

        operator = await datacardModel.findOne({ "parameter.billerId": billerId });


        if (!operator) {
            operator = await datacardModel.create({
                userId:req.user.id,
                "parameter.opId":opId,
                "parameter.billerId":billerId,
                "parameter.operatorName":operatorName,
                "parameter.category":category,
                "parameter.viewBill":viewBill,
                "parameter.bbpsEnabled":bbpsEnabled,
                "parameter.regex":regex,
                "parameter.name":name,
                "parameter.cn":cn
            });
        }

        return res.status(200).json(new APIResponse("Data Card Operator fetched successfully!", 200, operator));
    } catch (error) {
        return res.status(500).json(new APIError("Error: " + error.message, 500));
    }
};



