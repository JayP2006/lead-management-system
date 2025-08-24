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
     origin: "https://lead-management-system-blond.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/auth", authRoutes);
app.use("/leads", leadRoutes);


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    connectDB();
    console.log(` Server running on port ${PORT}`);
})
