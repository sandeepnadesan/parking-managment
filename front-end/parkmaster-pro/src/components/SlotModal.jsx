const SlotModal = () => {
    return (
      <div id="slotModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Parking Slot Details</h3>
            <button onClick={() => document.getElementById('slotModal').classList.add('hidden')} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div id="slotStatusIcon" className="p-3 rounded-full bg-gray-200">
                <i className="fas fa-car text-xl"></i>
              </div>
              <div>
                <h4 id="slotNumber" className="text-xl font-bold">A01</h4>
                <p id="slotStatus" className="text-sm">Status</p>
              </div>
            </div>
            <div className="space-y-3">
              <Info label="Vehicle Number" id="vehicleNumber" />
              <Info label="Check-in Time" id="checkInTime" />
              <Info label="Duration" id="duration" />
            </div>
            <div className="mt-6 flex space-x-3">
              {['checkOutBtn', 'reserveBtn', 'maintenanceBtn', 'releaseBtn'].map(id => (
                <button key={id} id={id} className="hidden px-4 py-2 text-white rounded-lg bg-gray-600 hover:bg-gray-700">
                  {id.replace('Btn', '').replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Info = ({ label, id }) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p id={id} className="font-medium">-</p>
    </div>
  );
  
  export default SlotModal;
  