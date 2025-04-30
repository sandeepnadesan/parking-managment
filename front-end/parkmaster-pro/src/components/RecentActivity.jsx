const activities = [
    { icon: 'fa-car', color: 'blue', text: 'Vehicle #ABC123 checked in', time: 'Slot A12 • 10:42 AM' },
    { icon: 'fa-car', color: 'green', text: 'Vehicle #XYZ789 checked out', time: 'Slot B05 • 10:35 AM' },
    { icon: 'fa-calendar', color: 'purple', text: 'Reservation made for John D.', time: 'Slot C08 • 10:22 AM' },
    { icon: 'fa-tools', color: 'yellow', text: 'Maintenance started on Slot D12', time: '9:58 AM' },
    { icon: 'fa-exclamation', color: 'red', text: 'Overstay alert for Vehicle #LMN456', time: 'Slot A03 • 9:45 AM' },
  ];
  
  const RecentActivity = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map(({ icon, color, text, time }, i) => (
            <div key={i} className="flex items-start">
              <div className={`p-2 bg-${color}-100 text-${color}-600 rounded-full mr-3`}>
                <i className={`fas ${icon}`}></i>
              </div>
              <div>
                <p className="text-sm font-medium">{text}</p>
                <p className="text-xs text-gray-500">{time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
          View All Activity
        </button>
      </div>
    );
  };
  
  export default RecentActivity;
  