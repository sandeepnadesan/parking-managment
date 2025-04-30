import TopNav from '../components/TopNav';
import ParkingMap from '../components/ParkingMap';
import SlotModal from '../components/SlotModal';

const ParkingMapPage = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav title="Parking Map" />
      <main className="flex-1 overflow-y-auto p-6">
        <ParkingMap />
        <SlotModal />
      </main>
    </div>
  );
};

export default ParkingMapPage;
