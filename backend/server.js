const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());


// Import routes
const authRoutes = require("./routes/auth.routes");

//routes

app.get("/", (req, res) => {
  res.send("Server is running ");
});

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});