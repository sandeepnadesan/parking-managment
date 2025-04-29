const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  phone: String,
  vehicleNumber: String,
}, { timestamps: true });

// Parking Slot Schema
const parkingSlotsSchema = new Schema({
  slotNumber: { type: String, required: true, unique: true },
  level: String,
  isOccupied: { type: Boolean, default: false },
  type: { type: String, enum: ['car', 'bike', 'ev', 'handicapped'], required: true },
  reservedFor: { type: String, enum: ['none', 'vip', 'disabled'], default: 'none' },
}, { timestamps: true });

// Booking Schema
const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'ParkingSlot', required: true },
  vehicleNumber: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['booked', 'active', 'completed', 'cancelled'], default: 'booked' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
}, { timestamps: true });

// Vehicle Schema (Optional for multiple vehicles)
const vehicleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plateNumber: { type: String, required: true },
  type: { type: String, enum: ['car', 'bike', 'ev'], required: true },
  brand: String,
  color: String,
}, { timestamps: true });


// Model exports
const User = mongoose.model('User', userSchema);
const ParkingSlots = mongoose.model('ParkingSlot', parkingSlotsSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Vehicle = mongoose.model('Vehicle', vehicleSchema);
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  User,
  ParkingSlot,
  Booking,
  Vehicle,
  Payment
};
