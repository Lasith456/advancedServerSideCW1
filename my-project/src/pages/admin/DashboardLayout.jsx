import { Outlet, Link } from "react-router-dom";

const DashboardLayout = () => {

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <Link to="all-countries" className="hover:text-yellow-300 block">All Countries</Link>
            <Link to="single-country" className="hover:text-yellow-300 block">Single Country</Link>
            <Link to="generate-key" className="hover:text-yellow-300 block">Generate API Key</Link>
            <Link to="user-management" className="hover:text-yellow-300 block">User Management</Link>
            <Link to="api-usage" className="hover:text-yellow-300 block">API Usage Stats</Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
