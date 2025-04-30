const Slot = require('../models/Slot');

// Get all slots
exports.getSlots = async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
};

// Add new slot
exports.createSlot = async (req, res) => {
  const slot = new Slot(req.body);
  await slot.save();
  res.status(201).json(slot);
};

// Update slot
exports.updateSlot = async (req, res) => {
  const { id } = req.params;
  const slot = await Slot.findByIdAndUpdate(id, req.body, { new: true });
  res.json(slot);
};
