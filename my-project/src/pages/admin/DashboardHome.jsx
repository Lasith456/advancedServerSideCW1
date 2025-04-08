import { FaKey, FaGlobeAsia, FaUserShield, FaSearch, FaChartBar } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the  🌍 CountryAPI</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-3">
            <FaGlobeAsia className="text-yellow-400 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">All Countries</h2>
          </div>
          <p className="text-gray-600">View a full list of countries and details retrieved using the API key.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-3">
            <FaSearch className="text-yellow-400 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Search by Name</h2>
          </div>
          <p className="text-gray-600">Search and fetch a specific country's data using name input.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-3">
            <FaKey className="text-yellow-400 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">API Key Generator</h2>
          </div>
          <p className="text-gray-600">Generate secure API keys for users with expiration and limits.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-3">
            <FaUserShield className="text-yellow-400 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          </div>
          <p className="text-gray-600">Manage user roles and permissions for accessing different features.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4 mb-3">
            <FaChartBar className="text-yellow-400 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">API Usage</h2>
          </div>
          <p className="text-gray-600">Track API key usage, quotas, and performance analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
