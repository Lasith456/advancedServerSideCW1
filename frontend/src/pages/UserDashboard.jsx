import { useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState("");

  const fetchCountry = async () => {
    try {
      setError("");
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`,
        { headers: { "X-API-KEY": apiKey } }
      );
      setCountryData(response.data[0]);
    } catch (err) {
      setError("Invalid API Key or Country not found");
    }
  };

  return (
    <div className="dashboard">
      <h2>User Dashboard</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Country Name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={fetchCountry}>Get Country Details</button>
      </div>

      {error && <p className="error">{error}</p>}
      {countryData && (
        <div className="country-info">
          <h3>{countryData.name.common}</h3>
          <p>Region: {countryData.region}</p>
          <p>Population: {countryData.population}</p>
        </div>
      )}
    </div>
  );
}
