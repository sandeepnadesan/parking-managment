const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.get('/', slotController.getSlots);
router.post('/', slotController.createSlot);
router.put('/:id', slotController.updateSlot);

module.exports = router;
