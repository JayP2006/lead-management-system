require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "lead-management-system-blond.vercel.app",
    credentials: true
}));


app.use("/auth", authRoutes);
app.use("/leads", leadRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    connectDB();
    console.log(` Server running on port ${PORT}`);
})
