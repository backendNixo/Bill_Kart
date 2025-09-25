import { OrderHistory } from "../../model/users/orderHistory.model.js";
import APIError from "../../utils/APIError.js";
import { APIResponse } from "../../utils/APIResponse.js";


//get order history list
export const GetOrderHistory=async(req,res)=>{
    try {
         const OrderList=await OrderHistory.find({userId:req.user.id});

         if(OrderHistory.length==0){
          return res.status(400).json(new APIError("Order List Empty",400))
         }
         return res.status(200).json(new APIResponse("Order History List ", 200,OrderList))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}


//get order history by id
export const GetOrderHistoryById=async(req,res)=>{
    try {
        const {orderId}=req.params;
        if(!orderId){
          return res.status(400).json(new APIError("Order History Id Not Found",400))
         }
         const Order=await OrderHistory.findOne({_id:orderId,userId:req.user.id});

         if(!Order){
          return res.status(400).json(new APIError("Order History Not Found",400))
         }
         return res.status(200).json(new APIResponse("Order History ", 200,Order))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}


//get order history between date
export const GetOrderHistoryDate=async(req,res)=>{
    try {
        const {startDate,endDate}=req.body;
          
        if(!startDate||!endDate){
            return res.status(400).json(new APIError("Start And End Date Required",400))
        }
        let start,end;
        if(startDate&&endDate){
         start=new Date(startDate);
          end=new Date(endDate);
        }else
        {
            start=new Date();
            start=start.setHours(0,0,0,0);
            end=new Date();
            end=end.setHours(23,59,59,999);
        }
         
   
         const OrderList=await OrderHistory.find({
            userId:req.user.id,
            createdAt:{$gte:start,$lte:end}
         }).sort({createdAt:-1});

         if(OrderHistory.length==0){
            return res.status(400).json(new APIError("Order History Not Found Between These Date",400))
         }
         return res.status(200).json(new APIResponse("Order History ", 200,OrderList))
    } catch (error) {
        return res.status(500).json(new APIError("Error :" + error, 500));
    }
}

