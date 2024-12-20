const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes')
const budgetRoutes = require('./routes/budgetRoutes')
const reportsRoutes = require('./routes/reportsRoutes');
const cors = require('cors');
const { verifyToken } = require('./middlewares/authMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/transactions',verifyToken , transactionRoutes);
app.use('/api/budget', verifyToken,budgetRoutes);
app.use('/api/reports', reportsRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
