

import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/test.route.js";
import AdminRoutes from "./routes/admin/admin.route.js"
import { checkIpLimit, encryptMiddleware, decryptMiddleware } from "./middleware/test.middleware.js";
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
app.use("/api/auth", authRoutes);
app.use("/api/admin", AdminRoutes)

app.listen(9000, () => console.log("Server running on port 9000"));
