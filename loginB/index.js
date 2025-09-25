const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
// this is for accepting cookies from frontend
const allowedOrigins = [
    "http://localhost:3000",  // Local development
    "http://localhost:5173",  // Vite development
    process.env.FRONTEND_URL  // Production URL
].filter(Boolean); // Remove any undefined values

console.log('Allowed CORS origins:', allowedOrigins); // Debug log

app.use(cors({
    origin: function (origin, callback) {
        console.log('CORS request from origin:', origin); // Debug log
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('CORS: Origin allowed:', origin); // Debug log
            callback(null, true);
        } else {
            console.log('CORS: Origin blocked:', origin); // Debug log
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

// Routes of Auth API
app.use("/api/auth", authRouter);
// routes for user
app.use("/api/user", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
