require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donation');
const app = express();
connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
