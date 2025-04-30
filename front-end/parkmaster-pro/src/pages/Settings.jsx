import TopNav from '../components/TopNav';

const Settings = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopNav title="Settings" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p>This is a placeholder for app settings and configurations.</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
