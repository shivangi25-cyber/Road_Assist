const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (dashboard)
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
  res.send('🚗 RoadAssist Backend is running successfully!');
});

// Service Centers Routes
const serviceCenterRoutes = require('./routes/serviceCenter');
app.use('/api/service-centers', serviceCenterRoutes);

// Service Requests Routes
const serviceRequestRoutes = require('./routes/serviceRequest');
app.use('/api/service-requests', serviceRequestRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection failed:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Mechanic Dashboard: http://localhost:${PORT}/mechanic-dashboard.html`);
});