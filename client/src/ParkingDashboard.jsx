// ParkingDashboard.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'font-awesome/css/font-awesome.min.css';

const ParkingDashboard = () => {
  const chartRef = useRef(null);         // canvas DOM reference
  const chartInstance = useRef(null);    // chart instance reference

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Occupancy Rate',
              data: [65, 59, 80, 81, 56, 55, 40],
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderColor: 'rgba(79, 70, 229, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
            {
              label: 'Reservation Rate',
              data: [28, 35, 40, 30, 45, 30, 20],
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => `${value}%`,
              },
            },
          },
        },
      });
    }

    // Cleanup on unmount
    return () => {
      chartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-indigo-800 text-white p-4 hidden md:block">
        <div className="text-xl font-bold mb-6 flex items-center space-x-2">
          <i className="fa fa-parking text-yellow-300" />
          <span>ParkMaster Pro</span>
        </div>
        <nav>
          <p className="text-indigo-300 uppercase text-xs font-semibold mb-2">Main</p>
          <a href="#" className="block py-2 px-3 rounded-lg bg-indigo-700 mb-4">
            <i className="fa fa-tachometer-alt mr-2" /> Dashboard
          </a>
          <p className="text-indigo-300 uppercase text-xs font-semibold mb-2">Parking Management</p>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-2">
            <i className="fa fa-map-marked-alt mr-2" /> Parking Map
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-2">
            <i className="fa fa-calendar-check mr-2" /> Reservations
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-4">
            <i className="fa fa-car mr-2" /> Vehicle Tracking
          </a>
          <p className="text-indigo-300 uppercase text-xs font-semibold mb-2">Reports</p>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-2">
            <i className="fa fa-chart-bar mr-2" /> Occupancy
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-4">
            <i className="fa fa-money-bill-wave mr-2" /> Revenue
          </a>
          <p className="text-indigo-300 uppercase text-xs font-semibold mb-2">Settings</p>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700 mb-2">
            <i className="fa fa-cog mr-2" /> System Settings
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-indigo-700">
            <i className="fa fa-users-cog mr-2" /> User Management
          </a>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <header className="flex justify-between items-center bg-white p-4 shadow mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Parking Space Dashboard</h1>
          <div className="flex space-x-4 items-center">
            <i className="fa fa-bell text-xl text-gray-600 relative">
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </i>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-indigo-500 text-white flex items-center justify-center rounded-full font-semibold">
                AD
              </div>
              <span className="font-medium hidden md:inline">Admin</span>
              <i className="fa fa-chevron-down text-xs"></i>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard label="Total Spaces" value="120" icon="fa-parking" color="blue" growth="+5% from yesterday" />
          <StatCard label="Occupied" value="84" icon="fa-car" color="red" growth="70% occupancy" />
          <StatCard label="Reserved" value="15" icon="fa-calendar-alt" color="yellow" growth="12.5% reserved" />
          <StatCard label="Revenue Today" value="$1,245" icon="fa-dollar-sign" color="green" growth="+8% from yesterday" />
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Occupancy Analytics</h2>
          <div className="h-72">
            <canvas ref={chartRef}></canvas>
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, growth }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <i className={`fa ${icon} text-xl`}></i>
      </div>
    </div>
    <div className="mt-4">
      <span className="text-green-500 text-sm font-medium">{growth}</span>
    </div>
  </div>
);

export default ParkingDashboard;
