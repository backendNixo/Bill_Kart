import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import connectDB from "./config/db.js";
import authRoutes from "./routes/test.route.js";
import { checkIpLimit, encryptMiddleware, decryptMiddleware } from "./middleware/test.middleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

app.use(checkIpLimit);
app.use(decryptMiddleware);
app.use(encryptMiddleware);


app.use("/api", authRoutes);

const PORT = 9000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed", err);
  }
});
