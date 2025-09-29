import cors from "cors";

export const corsMiddleware = cors({
    origin:["http://192.168.1.253:4000","http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT","PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept"
    ]
})