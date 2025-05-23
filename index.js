// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

 const baseUrl= process.env.BASE_URL;
 console.log("🚀 ~ baseUrl:", baseUrl)
app.use(
  cors({
    origin: baseUrl, // Your frontend URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // If needed for cookies/auth
  })
);
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const courseRoutes = require("./routes/courseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const certificateRoutes = require("./routes/certificateRoutes");


app.use(bodyParser.json());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Server is running fine.");
  console.log("Mahad server is running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/certificates", certificateRoutes);


const mongodb_URL= process.env.MONGODB_URL;

mongoose.
connect(mongodb_URL).then(()=> {
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})


})
.catch((error) => {
  console.error("MongoDB connection error:", error);
  process.exit(1); // Exit the process with failure
});
