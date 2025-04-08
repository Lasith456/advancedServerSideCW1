import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("refreshToken")
    console.log(token)
    setIsLoggedIn(!!token);
  }, [location.pathname]); 

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const redirectDashBoard = () => {
    navigate("/admin-dashboard");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🌍 CountryAPI
      </Link>

      <div className="space-x-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
        >
          Home
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={redirectDashBoard}
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium transition duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
