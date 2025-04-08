import { Outlet, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">User Panel</h2>
          <nav className="space-y-2">
            <Link to="all-countries" className="hover:text-yellow-300 block">All Countries</Link>
            <Link to="single-country" className="hover:text-yellow-300 block">Search Country</Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;

