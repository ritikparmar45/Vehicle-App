import { VehicleService } from '../services/vehicleService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await VehicleService.getUserVehicles(req.user._id);
  res.json({ vehicles });
});

export const addVehicle = asyncHandler(async (req, res) => {
  const vehicle = await VehicleService.createVehicle(req.user._id, req.body);
  res.status(201).json({ message: 'Vehicle added to garage', vehicle });
});

export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await VehicleService.updateVehicle(req.user._id, req.params.id, req.body);
  res.json({ message: 'Vehicle updated', vehicle });
});

export const deleteVehicle = asyncHandler(async (req, res) => {
  await VehicleService.deleteVehicle(req.user._id, req.params.id);
  res.json({ message: 'Vehicle removed from garage' });
});
