const express = require('express');
const app = express();

app.use(express.json());

const TOTAL_SLOTS = 5;
let parkedCars = [];
let availableSlots = Array.from({ length: TOTAL_SLOTS }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// Route to check parking status
app.get('/parking/status', (req, res) => {
    res.json({
        totalSlots: TOTAL_SLOTS,
        occupiedSlots: parkedCars.length,
        availableSlots: availableSlots.length,
        parkedCars: parkedCars
    });
});

// Route to park a car
app.post('/parking/park', (req, res) => {
    const { carNumber, ownerName } = req.body;

    if (!carNumber || !ownerName) {
        return res.status(400).json({ message: 'carNumber and ownerName are required.' });
    }

    if (availableSlots.length === 0) {
        return res.status(400).json({ message: 'Parking Full. No slots available.' });
    }

    const alreadyParked = parkedCars.find(car => car.carNumber === carNumber);
    if (alreadyParked) {
        return res.status(400).json({ message: 'This car is already parked.' });
    }

    const assignedSlot = availableSlots.shift(); // Take first available slot

    parkedCars.push({ slotNumber: assignedSlot, carNumber, ownerName, parkedAt: new Date() });
    res.status(201).json({ message: `Car parked successfully at slot ${assignedSlot}.`, parkedCars });
});

// Route to remove a parked car
app.post('/parking/leave', (req, res) => {
    const { carNumber } = req.body;

    if (!carNumber) {
        return res.status(400).json({ message: 'carNumber is required to leave.' });
    }

    const carIndex = parkedCars.findIndex(car => car.carNumber === carNumber);

    if (carIndex === -1) {
        return res.status(404).json({ message: 'Car not found in parking lot.' });
    }

    const leavingCar = parkedCars[carIndex];
    availableSlots.push(leavingCar.slotNumber); // Free the slot
    availableSlots.sort((a, b) => a - b); // Keep slots in order

    parkedCars.splice(carIndex, 1);
    res.json({ message: `Car has left the parking lot from slot ${leavingCar.slotNumber}.`, availableSlots: availableSlots.length });
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
