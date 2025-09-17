
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/test.route.js";
import AdminRoutes from "./routes/admin/admin.route.js";
import RedeemeRoutes from "./routes/users/redeeme.route.js";
import AdminOfferRoutes from "./routes/admin/offer.route.js";
import UserOfferRoutes from "./routes/users/offer.routes.js";
import serviceRoutes from "./routes/admin/service.route.js";
import notificationRoutes from "./routes/admin/notification.route.js";
import { checkIpLimit} from "./middleware/test.middleware.js";
import Apiroutes from "./routes/admin/api.route.js";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.js";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

const app = express();
connectDB();

// Middlewares

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
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




app.use('/api/admin/broadband',broadbandRoutes)
app.use('/api/admin/cable',cableRoutes)
app.use('/api/admin/creditcard',creditCard)
app.use('/api/admin/datacard',dataCardRoutes)
app.use('/api/admin/dth',dthRoutes)
app.use('/api/admin/electricity',electricityRoutes)
app.use('/api/admin/emi',EMIRoutes)
app.use('/api/admin/gas',gasRoutes)
app.use('/api/admin/insurance',insuranceRoutes)
app.use('/api/admin/landline',landlineRoutes)
app.use('/api/admin/postpaid',postpaidRoutes)
app.use('/api/admin/prepaid',prepaidRoutes)
app.use('/api/admin/watersuply',waterSuplyRoutes)


app.listen(9000, () => console.log("Server running on port 9000"));
