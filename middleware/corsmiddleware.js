import cors from "cors";

export const corsMiddleware = cors({
    origin:"http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept"
    ]
})