"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  // Logout Handler
  const handleLogout = () => {
    alert("Logged out successfully!");
    router.push("/login");
  };

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
        <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>
        <ul className="space-y-4">
          <li
            className="cursor-pointer px-4 py-2 rounded-md bg-blue-600"
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
        {/* API Key Input Section */}
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300">
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
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Get Countries Details
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Display Country Data */}
        {countryData && (
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-gray-300 mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700 text-center">Country Details</h3>
            <ul className="text-sm text-gray-600">
              {countryData.map((country, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{country.name.common}</strong> - {country.region}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
