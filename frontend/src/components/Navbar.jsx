import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { 
  FaUsers, 
  FaKey, 
  FaGlobeAmericas, 
  FaSearch,
  FaTachometerAlt,
  FaSignOutAlt
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="sidebar bg-dark text-white vh-100 position-fixed">
      <div className="d-flex flex-column h-100">
        <div className="p-3 border-bottom border-secondary">
          <h4 className="text-center mb-0">
            <FaTachometerAlt className="me-2" />
            Admin Panel
          </h4>
        </div>
        
        <Nav className="flex-column p-3">
          <Nav.Item>
            <Link 
              to="/admin/users" 
              className={`nav-link py-3 ${isActive('/users') ? 'active bg-primary rounded' : 'text-light'}`}
            >
              <FaUsers className="me-2" /> User Management
            </Link>
          </Nav.Item>
          
          <Nav.Item>
            <Link 
              to="/admin/generate-api" 
              className={`nav-link py-3 ${isActive('/generate-api') ? 'active bg-primary rounded' : 'text-light'}`}
            >
              <FaKey className="me-2" /> Generate API Key
            </Link>
          </Nav.Item>
          
          <Nav.Item>
            <Link 
              to="/admin/country-details" 
              className={`nav-link py-3 ${isActive('/country-details') ? 'active bg-primary rounded' : 'text-light'}`}
            >
              <FaGlobeAmericas className="me-2" /> All Countries
            </Link>
          </Nav.Item>
          
          <Nav.Item>
            <Link 
              to="/admin/single-country" 
              className={`nav-link py-3 ${isActive('/single-country') ? 'active bg-primary rounded' : 'text-light'}`}
            >
              <FaSearch className="me-2" /> Search Country
            </Link>
          </Nav.Item>
        </Nav>
        
        <div className="mt-auto p-3">
          <Link to="/login" className="nav-link text-danger d-flex align-items-center">
            <FaSignOutAlt className="me-2" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
