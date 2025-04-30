const StatsCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Available Spaces', icon: 'fa-car', color: 'green', countId: 'availableSpaces' },
          { label: 'Occupied Spaces', icon: 'fa-car-side', color: 'red', countId: 'occupiedSpaces' },
          { label: 'Reserved Spaces', icon: 'fa-calendar-check', color: 'blue', countId: 'reservedSpaces' },
          { label: 'Maintenance', icon: 'fa-tools', color: 'yellow', countId: 'maintenanceSpaces' }
        ].map(({ label, icon, color, countId }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600 mr-4`}>
              <i className={`fas ${icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-gray-500">{label}</p>
              <h3 className="text-2xl font-bold" id={countId}>0</h3>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsCards;
  