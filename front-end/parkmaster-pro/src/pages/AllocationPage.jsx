import TopNav from '../components/TopNav';
import SpaceAllocationForm from '../components/SpaceAllocationForm';

const AllocationPage = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav title="Space Allocation" />
      <main className="flex-1 overflow-y-auto p-6">
        <SpaceAllocationForm />
      </main>
    </div>
  );
};

export default AllocationPage;
