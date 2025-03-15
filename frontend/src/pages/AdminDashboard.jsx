import { Routes, Route } from "react-router-dom";
import UserManagement from "./UserManagement";
import GenerateApiKey from "./GenerateApiKey";
import CountryDetails from "./CountryDetails";
import SingleCountry from "./SingleCountry";
import Navbar from "../components/Navbar";
export default function AdminDashboard() {
  return (
    <div className="container">
              <Navbar/>

      <h1>Admin Dashboard</h1>
      <Routes>
        <Route path="users" element={<UserManagement />} />
        <Route path="generate-api" element={<GenerateApiKey />} />
        <Route path="country-details" element={<CountryDetails />} />
        <Route path="single-country" element={<SingleCountry />} />
      </Routes>
    </div>
  );
}
