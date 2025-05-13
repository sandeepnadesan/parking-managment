const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotId: String,
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'maintenance'],
    default: 'available'
  },
  floor: String,
  type: String,
  reservedBy: String,
  vehicleNumber: String
});

module.exports = mongoose.model('Slot', slotSchema);
