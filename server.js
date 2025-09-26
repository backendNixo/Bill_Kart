
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/test.route.js";
import AdminRoutes from "./routes/admin/admin.route.js";
import RedeemeRoutes from "./routes/users/redeeme.route.js";
import AdminOfferRoutes from "./routes/admin/offer.route.js";
import UserOfferRoutes from "./routes/users/offer.routes.js";
import serviceRoutes from "./routes/admin/service.route.js";
import userRoutes from "./routes/users/user.route.js";
import notificationRoutes from "./routes/admin/notification.route.js";
import { checkIpLimit} from "./middleware/test.middleware.js";
import Apiroutes from "./routes/admin/api.route.js";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js";
import compression from "compression";
import dotenv from "dotenv";
import {corsMiddleware} from "./middleware/corsmiddleware.js"

dotenv.config({
    path: './.env'
});

const app = express();
connectDB();

// Middlewares

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(compression());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(encryptMiddleware);
// app.use(decryptMiddleware);
app.use(checkIpLimit);

// Routes

[Apiroutes,AdminRoutes,AdminOfferRoutes,serviceRoutes,notificationRoutes].forEach(route=>{
    app.use("/api/admin",route);
})

app.use("/api/auth", authRoutes);
app.use("/api/user",RedeemeRoutes);
app.use("/api/user",UserOfferRoutes);
app.use('/api/user',userRoutes);


import broadbandRoutes from "./routes/services/broadband/broadband.routes.js";
import cableRoutes from "./routes/services/cable/cable.route.js";
import creditCard from "./routes/services/creditCardPay/creditCard.route.js";
import dataCardRoutes from "./routes/services/datacardPrepaid/dataCard.route.js";
import dthRoutes from "./routes/services/DTH/dth.route.js";
import electricityRoutes from "./routes/services/electricity/electricity.route.js";
import EMIRoutes from "./routes/services/EMIPayment/EmiPayment.route.js";
import gasRoutes from "./routes/services/gas/gas.route.js";
import insuranceRoutes from "./routes/services/insurance/insurance.route.js";
import landlineRoutes from "./routes/services/insurance/insurance.route.js";
import postpaidRoutes from "./routes/services/postpaid/postpaid.route.js";
import prepaidRoutes from "./routes/services/prepaid/prepaid.route.js";
import waterSuplyRoutes from "./routes/services/waterSuply/waterSuply.route.js";
import donationRoutes from "./routes/services/donation/donation.route.js";
import fastagRoutes from "./routes/services/fastag/fastag.route.js";
import loanRepaymentRoutes from './routes/services/loanRepayment/loanRepayment.route.js';
import lpgRoutes from './routes/services/lpg/lpg.route.js';
import municipalityRoutes from "./routes/services/municipality/municipality.route.js";
import municipalTaxRoutes from "./routes/services/municipalTax/municipalTax.route.js";
import orderRoutes from "./routes/admin/order.route.js";


app.use('/api/user/broadband',broadbandRoutes)
app.use('/api/user/cable',cableRoutes)
app.use('/api/user/creditcard',creditCard)
app.use('/api/user/datacard',dataCardRoutes)
app.use('/api/user/dth',dthRoutes)
app.use('/api/user/electricity',electricityRoutes)
app.use('/api/user/emi',EMIRoutes)
app.use('/api/user/gas',gasRoutes)
app.use('/api/user/insurance',insuranceRoutes)
app.use('/api/user/landline',landlineRoutes)
app.use('/api/user/postpaid',postpaidRoutes)
app.use('/api/user/prepaid',prepaidRoutes)
app.use('/api/user/watersuply',waterSuplyRoutes)
app.use('/api/user/donation',donationRoutes);
app.use('/api/user/fastag',fastagRoutes);
app.use('/api/user/loanrepayment',loanRepaymentRoutes);
app.use('/api/user/lpg',lpgRoutes);
app.use('/api/user/municipality',municipalityRoutes);
app.use('/api/user/municipalTax',municipalTaxRoutes);
app.use('/api/user/order',orderRoutes);





app.listen(9000, () => console.log("Server running on port 9000"));
