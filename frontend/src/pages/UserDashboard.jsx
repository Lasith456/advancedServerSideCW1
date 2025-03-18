import { Routes, Route } from "react-router-dom";

import CountryDetails from "./UserCountryDetails";
import SingleCountry from "./UserSingleCountry";
import UserNavbar from "../components/UserNavbar";
export default function AdminDashboard() {
  return (
    <div className="container">
              <UserNavbar/>

      <h1>User Dashboard</h1>
      <Routes>
        <Route path="country-details" element={<CountryDetails />} />
        <Route path="single-country" element={<SingleCountry />} />
      </Routes>
    </div>
  );
}
