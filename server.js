
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/test.route.js";
import AdminRoutes from "./routes/admin/admin.route.js";
import RedeemeRoutes from "./routes/users/redeeme.route.js";
import AdminOfferRoutes from "./routes/admin/offer.route.js";
import UserOfferRoutes from "./routes/users/offer.routes.js";
import serviceRoutes from "./routes/admin/service.route.js";
import notificationRoutes from "./routes/admin/notification.route.js";
import operatorsRoutes from "./routes/services/operators.routes.js";
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

app.use("/api/operator",operatorsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user",RedeemeRoutes);
app.use("/api/user",UserOfferRoutes);

app.listen(9000, () => console.log("Server running on port 9000"));
