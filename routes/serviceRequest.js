const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const ServiceCenter = require('../models/ServiceCenter');

// GET all service requests
router.get('/', async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('serviceCenter')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new service request
router.post('/', async (req, res) => {
  try {
    console.log('Creating service request:', req.body);
    const newRequest = new ServiceRequest(req.body);
    await newRequest.save();
    
    // Populate service center details
    await newRequest.populate('serviceCenter');
    
    console.log('Service request created successfully');
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all requests for a user (by phone number)
router.get('/user/:phone', async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ 
      userPhone: req.params.phone 
    })
    .populate('serviceCenter')
    .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id)
      .populate('serviceCenter');
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, estimatedArrival } = req.body;
    
    const updateData = { status };
    if (estimatedArrival) updateData.estimatedArrival = estimatedArrival;
    if (status === 'completed') updateData.completedAt = new Date();
    
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('serviceCenter');
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel a request
router.delete('/:id', async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json({ message: 'Request cancelled', request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;