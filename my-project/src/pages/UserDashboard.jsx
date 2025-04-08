import { Outlet, Link } from "react-router-dom";

const UserDashboard = () => {


  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center border-b border-blue-700 pb-4">
            User Panel
          </h2>

          <nav className="space-y-4">
            <Link
              to="all-countries"
              className="block px-4 py-2 rounded-md hover:bg-blue-700 hover:text-yellow-300 transition font-medium"
            >
              All Countries
            </Link>
            <Link
              to="single-country"
              className="block px-4 py-2 rounded-md hover:bg-blue-700 hover:text-yellow-300 transition font-medium"
            >
              Search Country
            </Link>
          </nav>
        </div>

      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
