import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['car', 'bike'],
    default: 'car'
  },
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  licensePlate: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  color: {
    type: String,
    trim: true
  },
  mileage: {
    type: Number,
    min: 0,
    default: 0
  },
  lastServiceDate: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Vehicle', vehicleSchema);
