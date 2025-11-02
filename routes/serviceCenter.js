const express = require('express');
const router = express.Router();
const ServiceCenter = require('../models/ServiceCenter');

// Get all service centers
router.get('/', async (req, res) => {
  try {
    const centers = await ServiceCenter.find();
    res.json(centers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get nearby service centers (within 10km)
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude } = req.query;
    
    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude required' });
    }

    const centers = await ServiceCenter.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: 10000 // 10km in meters
        }
      }
    });

    res.json(centers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new service center (for testing)
router.post('/', async (req, res) => {
  try {
    const newCenter = new ServiceCenter(req.body);
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;