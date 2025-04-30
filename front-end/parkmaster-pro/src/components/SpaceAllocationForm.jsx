const SpaceAllocationForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      alert('Parking space allocated successfully!');
      e.target.reset();
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Allocate Parking Space</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="ABC123" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="John Doe" />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parking Slot</label>
              <select className="w-full px-3 py-2 border rounded-lg" required>
                <option value="">Select a slot</option>
                {['A01', 'A02', 'A03', 'B01', 'B02'].map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="0">Full day</option>
              </select>
            </div>
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg"
              rows="2"
              placeholder="Disabled parking, EV charging, etc."
            ></textarea>
          </div>
  
          <div className="flex justify-end space-x-3">
            <button type="reset" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Allocate Space
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default SpaceAllocationForm;
  