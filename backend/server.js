const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cron = require("node-cron");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

//delete unverified users job
const deleteUnverifiedUsers = require("./jobs/deleteunverifiedUsers");
cron.schedule("0  * * * *", deleteUnverifiedUsers); // Runs every hour

// Import routes
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");

//routes

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});