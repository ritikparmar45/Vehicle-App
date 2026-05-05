import express from 'express';
import Vehicle from '../models/Vehicle.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET all vehicles for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ vehicles });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add a new vehicle
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, make, model, year, licensePlate, color, mileage } = req.body;
    
    // Check if license plate already exists
    const existingVehicle = await Vehicle.findOne({ licensePlate: licensePlate.toUpperCase() });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle with this license plate already exists in system' });
    }

    const vehicle = new Vehicle({
      user: req.user._id,
      type,
      make,
      model,
      year,
      licensePlate: licensePlate.toUpperCase(),
      color,
      mileage
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle added to garage', vehicle });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to add vehicle' });
  }
});

// PUT update vehicle
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.id, user: req.user._id });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const updates = req.body;
    if (updates.licensePlate) updates.licensePlate = updates.licensePlate.toUpperCase();

    Object.assign(vehicle, updates);
    await vehicle.save();
    
    res.json({ message: 'Vehicle updated', vehicle });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update vehicle' });
  }
});

// DELETE vehicle
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle removed from garage' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
