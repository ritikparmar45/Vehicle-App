import Vehicle from '../models/Vehicle.js';
import ErrorResponse from '../utils/errorResponse.js';

export class VehicleService {
  static async getUserVehicles(userId) {
    return await Vehicle.find({ user: userId }).sort({ createdAt: -1 }).lean();
  }

  static async createVehicle(userId, vehicleData) {
    const { type, make, model, year, licensePlate, color, mileage } = vehicleData;
    const formattedPlate = licensePlate.toUpperCase();

    const existingVehicle = await Vehicle.findOne({ licensePlate: formattedPlate });
    if (existingVehicle) {
      throw new ErrorResponse('Vehicle with this license plate already exists in system', 400);
    }

    const vehicle = new Vehicle({
      user: userId,
      type,
      make,
      model,
      year,
      licensePlate: formattedPlate,
      color,
      mileage
    });

    await vehicle.save();
    return vehicle;
  }

  static async updateVehicle(userId, vehicleId, updates) {
    const vehicle = await Vehicle.findOne({ _id: vehicleId, user: userId });
    if (!vehicle) {
      throw new ErrorResponse('Vehicle not found', 404);
    }

    if (updates.licensePlate) {
      updates.licensePlate = updates.licensePlate.toUpperCase();
    }

    Object.assign(vehicle, updates);
    await vehicle.save();
    return vehicle;
  }

  static async deleteVehicle(userId, vehicleId) {
    const vehicle = await Vehicle.findOneAndDelete({ _id: vehicleId, user: userId });
    if (!vehicle) {
      throw new ErrorResponse('Vehicle not found', 404);
    }
    return true;
  }
}
