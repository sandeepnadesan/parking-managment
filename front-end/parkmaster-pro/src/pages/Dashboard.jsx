import TopNav from '../components/TopNav';
import StatsCards from '../components/StatsCards';
import ParkingMap from '../components/ParkingMap';
import RecentActivity from '../components/RecentActivity';
import UtilizationChart from '../components/UtilizationChart';
import SlotModal from '../components/SlotModal';

const Dashboard = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav title="Parking Space Dashboard" />
      <main className="flex-1 overflow-y-auto p-6">
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ParkingMap />
          <RecentActivity />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UtilizationChart />
        </div>
        <SlotModal />
      </main>
    </div>
  );
};

export default Dashboard;
