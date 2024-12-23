const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const reportsRoutes = require("./routes/reportsRoutes");
const cors = require("cors");
const { verifyToken } = require("./middlewares/authMiddleware");

dotenv.config();
connectDB();

const allowedOrigins = [
  "http://localhost:4200",
  "https://personal-finance-app-jatp.onrender.com", 
   "https://personal-finance-app-seven-blue.vercel.app"
];

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Block the origin
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// test route
app.get('/', (req, res) => {
  res.send("Hello World!");
});


app.use("/api/auth", authRoutes);
app.use("/api/transactions", verifyToken, transactionRoutes);
app.use("/api/budget", verifyToken, budgetRoutes);
app.use("/api/reports", reportsRoutes);

// test route
app.use("*", (req, res) => {
  console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
  res.status(404).send(`Unhandled request: ${req.method} ${req.originalUrl}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
