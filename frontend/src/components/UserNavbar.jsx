import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function UserNavbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/user-dashboard/country-details">Country Details</Link></li>
        <li><Link to="/user-dashboard/single-country">Single Country</Link></li>
      </ul>
    </nav>
  );
}
