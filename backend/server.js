const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Load env vars
dotenv.config();

// Connect DB
const { connectDB } = require('./config/db');
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

const app = express();

// Middleware
app.use(express.json()); 

app.use(cors({
  origin: 'https://aarogyacare.netlify.app',
  credentials: true
})); 

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('AarogyaCare API is running...');
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌿 Server running on port ${PORT}`);
});