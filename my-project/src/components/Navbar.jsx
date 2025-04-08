import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-xl">Country API Admin</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
