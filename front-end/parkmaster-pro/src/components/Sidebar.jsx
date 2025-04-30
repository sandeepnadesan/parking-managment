import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-blue-800 text-white w-64 flex-shrink-0">
      <div className="p-4 flex items-center space-x-3 border-b border-blue-700">
        <i className="fas fa-parking text-2xl text-yellow-300"></i>
        <h1 className="text-xl font-bold">ParkMaster Pro</h1>
      </div>
      <nav className="p-4">
        <div className="space-y-2">
          <NavLink to="/" className={({ isActive }) => `flex items-center space-x-3 p-2 rounded ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/map" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-map-marked-alt"></i>
            <span>Parking Map</span>
          </NavLink>
          <NavLink to="/allocation" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-car"></i>
            <span>Space Allocation</span>
          </NavLink>
          <NavLink to="/customers" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-users"></i>
            <span>Customers</span>
          </NavLink>
          <NavLink to="/billing" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-receipt"></i>
            <span>Billing</span>
          </NavLink>
          <NavLink to="/reports" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-chart-bar"></i>
            <span>Reports</span>
          </NavLink>
          <NavLink to="/settings" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-700">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </NavLink>
        </div>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-blue-700">
        <div className="flex items-center space-x-3">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full" />
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-blue-200">admin@parkmaster.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
