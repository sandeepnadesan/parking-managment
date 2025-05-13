import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, Calendar, Car, Cog, DollarSign, Eye, Edit, Info, MapPin, Menu, Bell, X, Users, Clipboard, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './parkmaster.css';

// Mock data for chart
const occupancyData = [
  { day: 'Mon', occupancy: 65, reservation: 28 },
  { day: 'Tue', occupancy: 59, reservation: 35 },
  { day: 'Wed', occupancy: 80, reservation: 40 },
  { day: 'Thu', occupancy: 81, reservation: 30 },
  { day: 'Fri', occupancy: 56, reservation: 45 },
  { day: 'Sat', occupancy: 55, reservation: 30 },
  { day: 'Sun', occupancy: 40, reservation: 20 },
];

// Mock data for parking slots
const initialParkingSlots = [
  { id: 'A1', status: 'available', type: 'Standard', floor: 'Floor 1' },
  { id: 'A2', status: 'occupied', type: 'Standard', floor: 'Floor 1', occupant: 'John Doe', license: 'ABC123', since: 'Today, 9:15 AM' },
  { id: 'A3', status: 'reserved', type: 'Standard', floor: 'Floor 1', reservedFor: 'Sarah Johnson', reservedTime: 'Today, 11:30 AM to 1:30 PM' },
  { id: 'A4', status: 'maintenance', type: 'Standard', floor: 'Floor 1', maintenanceNote: 'Lighting issue - scheduled for repair tomorrow' },
  { id: 'A5', status: 'available', type: 'Standard', floor: 'Floor 1' },
  { id: 'A6', status: 'occupied', type: 'Standard', floor: 'Floor 1', occupant: 'Mike Brown', license: 'XYZ789', since: 'Today, 8:30 AM' },
  { id: 'B1', status: 'available', type: 'Standard', floor: 'Floor 1' },
  { id: 'B2', status: 'occupied', type: 'Standard', floor: 'Floor 1', occupant: 'Emma Wilson', license: 'DEF456', since: 'Today, 10:45 AM' },
  { id: 'B3', status: 'reserved', type: 'Standard', floor: 'Floor 1', reservedFor: 'David Lee', reservedTime: 'Today, 2:00 PM to 4:00 PM' },
  { id: 'B4', status: 'available', type: 'Standard', floor: 'Floor 1' },
  { id: 'B5', status: 'maintenance', type: 'Standard', floor: 'Floor 1', maintenanceNote: 'Repainting - will be available tomorrow' },
  { id: 'B6', status: 'occupied', type: 'Standard', floor: 'Floor 1', occupant: 'Lisa Chen', license: 'GHI789', since: 'Today, 7:20 AM' },
];

// Mock data for reservations
const reservations = [
  { id: '#RES-001', customer: 'John Smith', slot: 'A3', dateTime: 'Today, 10:00 AM', duration: '4 hours', status: 'Active' },
  { id: '#RES-002', customer: 'Sarah Johnson', slot: 'B3', dateTime: 'Today, 11:30 AM', duration: '2 hours', status: 'Active' },
  { id: '#RES-003', customer: 'Michael Brown', slot: 'A5', dateTime: 'Tomorrow, 9:00 AM', duration: '8 hours', status: 'Upcoming' },
  { id: '#RES-004', customer: 'Emily Davis', slot: 'B6', dateTime: 'Yesterday, 3:00 PM', duration: '3 hours', status: 'Completed' },
];

// ParkingSlot component
const ParkingSlot = ({ slot, onClick }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'available': return 'status-available';
      case 'occupied': return 'status-occupied';
      case 'reserved': return 'status-reserved';
      case 'maintenance': return 'status-maintenance';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <Car className="parking-slot-icon" size={16} />;
      case 'occupied': return <Car className="parking-slot-icon" size={16} />;
      case 'reserved': return <Calendar className="parking-slot-icon" size={16} />;
      case 'maintenance': return <Cog className="parking-slot-icon" size={16} />;
      default: return <Car className="parking-slot-icon" size={16} />;
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div 
      className={`parking-slot ${getStatusClass(slot.status)}`}
      onClick={() => onClick(slot)}
    >
      {getStatusIcon(slot.status)}
      <p className="parking-slot-id">{slot.id}</p>
      <p className={`parking-slot-status ${getStatusClass(slot.status)}`}>
        {getStatusText(slot.status)}
      </p>
    </div>
  );
};

// StatsCard component
const StatsCard = ({ title, value, icon, color, subText }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div>
          <p className="stats-card-title">{title}</p>
          <h3 className="stats-card-value">{value}</h3>
        </div>
        <div className={`stats-card-icon ${color}`}>
          {icon}
        </div>
      </div>
      <div className="stats-card-footer">
        <span>{subText}</span>
      </div>
    </div>
  );
};

// SlotDetailsModal component
const SlotDetailsModal = ({ isOpen, onClose, slot, onChangeStatus }) => {
  if (!isOpen || !slot) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon">
              <Info size={24} />
            </div>
            <div className="modal-title">
              <h3>{`Slot ${slot.id} Details`}</h3>
            </div>
          </div>
          <div className="modal-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="detail-label">Slot Number:</p>
                <p>{slot.id}</p>
              </div>
              <div>
                <p className="detail-label">Status:</p>
                <p className="capitalize">{slot.status}</p>
              </div>
              <div>
                <p className="detail-label">Type:</p>
                <p>{slot.type}</p>
              </div>
              <div>
                <p className="detail-label">Floor:</p>
                <p>{slot.floor}</p>
              </div>
            </div>
            
            {slot.status === 'occupied' && (
              <div className="detail-section">
                <p className="detail-label">Occupied By:</p>
                <p>{slot.occupant} (License: {slot.license})</p>
                <p className="detail-note">Since: {slot.since}</p>
              </div>
            )}
            
            {slot.status === 'reserved' && (
              <div className="detail-section">
                <p className="detail-label">Reserved For:</p>
                <p>{slot.reservedFor}</p>
                <p className="detail-note">From: {slot.reservedTime}</p>
              </div>
            )}
            
            {slot.status === 'maintenance' && (
              <div className="detail-section">
                <p className="detail-label">Maintenance Note:</p>
                <p>{slot.maintenanceNote}</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={onClose}>
              Close
            </button>
            <button className="btn-secondary" onClick={() => {
              onChangeStatus(slot);
              onClose();
            }}>
              Change Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Application Component
const ParkMasterPro = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkingSlots, setParkingSlots] = useState(initialParkingSlots);
  const [activeTab, setActiveTab] = useState('all');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeStatus = (slot) => {
    alert(`Status change functionality would be implemented here for slot ${slot.id}`);
  };

  const filterSlots = (type) => {
    setActiveTab(type);
  };

  const filteredSlots = activeTab === 'all' 
    ? parkingSlots 
    : parkingSlots.filter(slot => slot.type.toLowerCase() === activeTab);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <Car className="icon-yellow" size={24} />
            <span>ParkMaster Pro</span>
          </div>
          <button className="mobile-close-btn" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-section-title">Main</p>
            <a href="#" className="nav-link active">
              <BarChart2 size={16} />
              <span>Dashboard</span>
            </a>
          </div>
          <div className="nav-section">
            <p className="nav-section-title">Parking Management</p>
            <a href="#" className="nav-link">
              <MapPin size={16} />
              <span>Parking Map</span>
            </a>
            <a href="#" className="nav-link">
              <Calendar size={16} />
              <span>Reservations</span>
            </a>
            <a href="#" className="nav-link">
              <Car size={16} />
              <span>Vehicle Tracking</span>
            </a>
          </div>
          <div className="nav-section">
            <p className="nav-section-title">Reports</p>
            <a href="#" className="nav-link">
              <BarChart2 size={16} />
              <span>Occupancy</span>
            </a>
            <a href="#" className="nav-link">
              <DollarSign size={16} />
              <span>Revenue</span>
            </a>
          </div>
          <div className="nav-section">
            <p className="nav-section-title">Settings</p>
            <a href="#" className="nav-link">
              <Cog size={16} />
              <span>System Settings</span>
            </a>
            <a href="#" className="nav-link">
              <Users size={16} />
              <span>User Management</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <h1 className="header-title">Parking Space Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge"></span>
            </div>
            <div className="user-menu">
              <div className="user-avatar">AD</div>
              <span className="user-name">Admin</span>
              <ChevronLeft size={16} className="user-dropdown-icon" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <StatsCard 
              title="Total Spaces" 
              value="120" 
              icon={<Car size={20} style={{ color: '#2563eb' }} />} 
              color="bg-blue" 
              subText="+5% from yesterday" 
            />
            <StatsCard 
              title="Occupied" 
              value="84" 
              icon={<Car size={20} style={{ color: '#dc2626' }} />} 
              color="bg-red" 
              subText="70% occupancy" 
            />
            <StatsCard 
              title="Reserved" 
              value="15" 
              icon={<Calendar size={20} style={{ color: '#d97706' }} />} 
              color="bg-yellow" 
              subText="12.5% reserved" 
            />
            <StatsCard 
              title="Revenue Today" 
              value="$1,245" 
              icon={<DollarSign size={20} style={{ color: '#16a34a' }} />} 
              color="bg-green" 
              subText="+8% from yesterday" 
            />
          </div>

          {/* Parking Map and Analytics */}
          <div className="parking-section">
            {/* Parking Map */}
            <div className="parking-map">
              <div className="section-header">
                <h2 className="section-title">Parking Lot A - Floor 1</h2>
                <div className="filter-tabs">
                  <button 
                    className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => filterSlots('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'standard' ? 'active' : ''}`}
                    onClick={() => filterSlots('standard')}
                  >
                    Standard
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'compact' ? 'active' : ''}`}
                    onClick={() => filterSlots('compact')}
                  >
                    Compact
                  </button>
                  <button 
                    className={`filter-tab ${activeTab === 'handicap' ? 'active' : ''}`}
                    onClick={() => filterSlots('handicap')}
                  >
                    Handicap
                  </button>
                </div>
              </div>
              
              <div className="parking-grid">
                {filteredSlots.map(slot => (
                  <ParkingSlot key={slot.id} slot={slot} onClick={handleSlotClick} />
                ))}
              </div>
              
              <div className="parking-footer">
                <div className="status-legend">
                  <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color occupied"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color reserved"></div>
                    <span>Reserved</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color maintenance"></div>
                    <span>Maintenance</span>
                  </div>
                </div>
                <button className="add-reservation-btn">
                  <span>+</span> Add Reservation
                </button>
              </div>
            </div>

            {/* Analytics */}
            <div className="analytics-card">
              <h2 className="section-title">Occupancy Analytics</h2>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`]} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="occupancy" 
                      name="Occupancy Rate" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      fill="#4f46e5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reservation" 
                      name="Reservation Rate" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="analytics-details">
                <div className="analytics-item">
                  <div className="analytics-label">
                    <span>Peak Hours</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-peak"></div>
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-label">
                    <span>Off-Peak Hours</span>
                    <span>6:00 PM - 8:00 AM</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-offpeak"></div>
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-label">
                    <span>Weekend Occupancy</span>
                    <span>Sat - Sun</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill progress-weekend"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reservations */}
          <div className="reservations-table">
            <div className="table-header">
              <h2 className="section-title">Recent Reservations</h2>
              <div className="table-actions">
                <p>Showing last 4 reservations</p>
                <button className="view-all-btn">
                  View All <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Reservation ID</th>
                    <th>Customer</th>
                    <th>Slot</th>
                    <th>Date & Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.id}</td>
                      <td>{reservation.customer}</td>
                      <td>{reservation.slot}</td>
                      <td>{reservation.dateTime}</td>
                      <td>{reservation.duration}</td>
                      <td>
                        <span className={`status-badge ${
                          reservation.status === 'Active' ? 'active' : 
                          reservation.status === 'Upcoming' ? 'upcoming' : 
                          'completed'
                        }`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn view">
                            <Eye size={16} />
                          </button>
                          <button className="action-btn edit">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="quick-actions-grid">
            <div className="quick-action-card">
              <div className="action-header">
                <div className="action-icon bg-purple">
                  <Clipboard size={20} />
                </div>
                <div>
                  <h3>Generate Reports</h3>
                  <p>Create daily, weekly, monthly reports</p>
                </div>
              </div>
              <button className="action-btn bg-purple">
                Generate
              </button>
            </div>
            <div className="quick-action-card">
              <div className="action-header">
                <div className="action-icon bg-blue">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3>Pricing Optimization</h3>
                  <p>Adjust pricing based on demand</p>
                </div>
              </div>
              <button className="action-btn bg-blue">
                Optimize
              </button>
            </div>
            <div className="quick-action-card">
              <div className="action-header">
                <div className="action-icon bg-green">
                  <Users size={20} />
                </div>
                <div>
                  <h3>Staff Management</h3>
                  <p>Schedule and assign tasks</p>
                </div>
              </div>
              <button className="action-btn bg-green">
                Manage
              </button>
            </div>
          </div>
        </main>
      </div>
      
      {/* Slot Details Modal */}
      <SlotDetailsModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        slot={selectedSlot}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
};

export default ParkMasterPro;