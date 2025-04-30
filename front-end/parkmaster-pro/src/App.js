import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ParkingMapPage from './pages/ParkingMapPage';
import AllocationPage from './pages/AllocationPage';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import ErrorBoundary from './components/ErrorBoundary';  // Import the ErrorBoundary

const App = () => {
  return (
    <Router>
      <ErrorBoundary>  {/* Wrap the Routes with ErrorBoundary */}
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<ParkingMapPage />} />
              <Route path="/allocation" element={<AllocationPage />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
