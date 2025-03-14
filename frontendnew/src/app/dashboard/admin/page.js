"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const [apiKey, setApiKey] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "User", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Admin", status: "Active" },
    { id: 3, name: "Michael Brown", role: "User", status: "Inactive" },
  ]);
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("User Management");
  const router = useRouter();

  // Logout Handler
  const handleLogout = () => {
    alert("Logged out successfully!");
    router.push("/login");
  };

  // Generate New API Key
  const generateApiKey = () => {
    const newKey = Math.random().toString(36).substr(2, 16).toUpperCase();
    setApiKey(newKey);
    alert("New API Key Generated!");
  };

  // Fetch Country Data
  const handleGetCountries = async () => {
    try {
      setError("");
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountryData(data.slice(0, 5)); // Show only 5 countries
    } catch (error) {
      setError("Failed to fetch country details.");
      console.error("API error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer px-4 py-2 rounded-md ${
              activeSection === "User Management" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("User Management")}
          >
            User Management
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-md ${
              activeSection === "API Key Generation" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("API Key Generation")}
          >
            API Key Generation
          </li>
          <li
            className={`cursor-pointer px-4 py-2 rounded-md ${
              activeSection === "Country Details" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("Country Details")}
          >
            Country Details
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center">
        {activeSection === "User Management" && (
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-center">User Management</h2>
            <ul className="text-sm text-gray-700">
              {users.map((user) => (
                <li key={user.id} className="border-b py-2 flex justify-between">
                  <span>{user.name} ({user.role})</span>
                  <span className={`text-${user.status === "Active" ? "green" : "red"}-500`}>
                    {user.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === "API Key Generation" && (
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Generate New API Key</h2>
          <input
            type="text"
            placeholder="Enter Email..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border border-gray-300 p-2 mb-4 rounded-lg w-full text-center text-gray-700"
          />
          <input
            type="password"
            placeholder="Enter Password..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full text-center text-gray-700"
          />
            <button
              onClick={generateApiKey}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Generate New API Key
            </button>
          </div>
        )}

        {activeSection === "Country Details" && (
          <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Enter API Key</h2>
          <input
            type="text"
            placeholder="Enter API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full text-center text-gray-700"
          />
            <button
              onClick={handleGetCountries}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 mt-3 py-2 rounded-lg"
            >
              Get Countries Details
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {countryData && (
              <ul className="mt-4 text-sm text-gray-700">
                {countryData.map((country, index) => (
                  <li key={index} className="border-b py-2">
                    <strong>{country.name.common}</strong> - {country.region}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
