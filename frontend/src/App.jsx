import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import GenerateApiKey from "./pages/GenerateApiKey";
import CountryDetails from "./pages/CountryDetails";
import SingleCountry from "./pages/SingleCountry";
import UserCountryDetails from "./pages/UserCountryDetails";
import UserSingleCountry from "./pages/UserSingleCountry"
export default function App() {
  return (

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/generate-api" element={<GenerateApiKey />} />
        <Route path="/admin/country-details" element={<CountryDetails />} />
        <Route path="/admin/single-country" element={<SingleCountry />} />
        <Route path="/user-dashboard/single-country" element={<UserSingleCountry />} />
        <Route path="/user-dashboard/country-details" element={<UserCountryDetails />} />

        </Routes>
      </Router>

  );
}
