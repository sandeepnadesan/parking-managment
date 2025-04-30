import TopNav from '../components/TopNav';

const Reports = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav title="Reports" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <h2 className="text-xl font-semibold mb-4">Reports and Analytics</h2>
          <p>This is a placeholder for viewing parking reports and analytics.</p>
        </div>
      </main>
    </div>
  );
};

export default Reports;
