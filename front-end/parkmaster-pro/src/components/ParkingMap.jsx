import { useEffect } from 'react';

const ParkingMap = () => {
  useEffect(() => {
    const parkingMap = document.getElementById('parkingMap');
    const rows = ['A', 'B', 'C', 'D'];
    const slotsPerRow = 12;

    const getRandomStatus = () => {
      const rand = Math.random();
      if (rand < 0.5) return 'available';
      if (rand < 0.8) return 'occupied';
      if (rand < 0.9) return 'reserved';
      return 'maintenance';
    };

    const updateStats = () => {
      const slots = document.querySelectorAll('.parking-slot');
      const count = type => Array.from(slots).filter(s => s.dataset.status === type).length;
      document.getElementById('availableSpaces').textContent = count('available');
      document.getElementById('occupiedSpaces').textContent = count('occupied');
      document.getElementById('reservedSpaces').textContent = count('reserved');
      document.getElementById('maintenanceSpaces').textContent = count('maintenance');
    };

    const generateSlots = () => {
      parkingMap.innerHTML = '';
      rows.forEach((row, i) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = `flex ${i > 0 ? 'mt-4' : ''}`;
        for (let j = 1; j <= slotsPerRow; j++) {
          const slotNumber = `${row}${j.toString().padStart(2, '0')}`;
          const status = getRandomStatus();
          const slot = document.createElement('div');
          slot.className = `parking-slot w-16 h-24 m-1 rounded-lg flex flex-col items-center justify-center cursor-pointer shadow-sm ${status}`;
          slot.dataset.slot = slotNumber;
          slot.dataset.status = status;

          slot.innerHTML = `
            <div class="text-xs font-medium">${slotNumber}</div>
            ${Math.random() < 0.1 ? '<i class="fas fa-bolt text-yellow-500 mt-1"></i>' : ''}
            ${Math.random() < 0.05 ? '<i class="fas fa-wheelchair text-blue-500 mt-1"></i>' : ''}
          `;

          slot.onclick = () => document.getElementById('slotModal').classList.remove('hidden');
          rowDiv.appendChild(slot);
        }
        parkingMap.appendChild(rowDiv);
      });

      updateStats();
    };

    generateSlots();
  }, []);

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Parking Lot Map</h3>
        <div className="flex space-x-2">
          {['Floor 1', 'Floor 2', 'Floor 3'].map(f => (
            <button key={f} className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">{f}</button>
          ))}
        </div>
      </div>
      <div id="parkingMap" className="relative h-[500px] bg-gray-100 rounded overflow-hidden"></div>
      <div className="flex justify-center mt-4 space-x-4 text-sm">
        <Legend label="Available" color="bg-green-300" />
        <Legend label="Occupied" color="bg-red-300" />
        <Legend label="Reserved" color="bg-blue-300" />
        <Legend label="Maintenance" color="bg-yellow-300" />
      </div>
    </div>
  );
};

const Legend = ({ label, color }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 ${color} mr-2`}></div>
    <span>{label}</span>
  </div>
);

export default ParkingMap;
