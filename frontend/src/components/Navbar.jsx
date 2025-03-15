import { Link } from "react-router-dom";
import "./Navbar.css"; // Custom styling

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/admin/users">User Management</Link></li>
        <li><Link to="/admin/generate-api">Generate API Key</Link></li>
        <li><Link to="/admin/country-details">Country Details</Link></li>
        <li><Link to="/admin/single-country">Single Country</Link></li>
      </ul>
    </nav>
  );
}
