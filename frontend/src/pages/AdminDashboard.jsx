import { Routes, Route } from "react-router-dom";
import UserManagement from "./UserManagement";
import GenerateApiKey from "./GenerateApiKey";
import CountryDetails from "./CountryDetails";
import SingleCountry from "./SingleCountry";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 col-md-3 p-0">
          <Navbar />
        </div>
        <div className="col-lg-10 col-md-9 p-4">
          <div className="dashboard-content">
            <h1 className="display-4 mb-4 text-primary fw-bold">Admin Dashboard</h1>
            <Routes>
              <Route path="users" element={<UserManagement />} />
              <Route path="generate-api" element={<GenerateApiKey />} />
              <Route path="country-details" element={<CountryDetails />} />
              <Route path="single-country" element={<SingleCountry />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}