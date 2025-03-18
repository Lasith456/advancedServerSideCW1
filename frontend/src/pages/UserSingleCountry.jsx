import { useState } from "react";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";
export default function SingleCountry() {
  const [countries, setCountries] = useState([]);
  const [apikey, setApiKey] = useState("");
  const [countryName, setcountryName] = useState("");
  const [error, setError] = useState(""); 

  const fetchAllCountries = async () => {
      setError(""); 
      try {
        const response = await axios.post(
          "http://localhost:3001/api/country/getSingleCountry",
          { apikey,countryName},
          {
            withCredentials: true, 
          }
        );
        console.log(response.data)
        setCountries(response.data.data);
      } catch (err) {
        console.error("API Key Generation Error:", err); 
        setError(err.response?.data?.message || "Failed to generate API Key");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    
  };

  return (
    <div className="section">
                    <UserNavbar/>
      
      <h2>Get Single Countries</h2>
      <input
        type="text"
        placeholder="please enter API Key"
        value={apikey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="please enter Country Name"
        value={countryName}
        onChange={(e) => setcountryName(e.target.value)}
      />
      <button className="btn btn-blue" onClick={fetchAllCountries}>Fetch Country</button>
      {error && <p className="error-message">{error}</p>} 
      
      {countries.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Currency</th>
                <th>Capital</th>
                <th>Languages</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, idx) => (
                <tr key={idx}>
                  <td>{country.name.common}</td>
                  <td>
                    {country.currencies
                      ? Object.values(country.currencies)
                          .map((currency) => `${currency.name} (${currency.symbol})`)
                          .join(", ")
                      : "N/A"}
                  </td>
                  <td>{country.capital ? country.capital[0] : "N/A"}</td>
                  <td>
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </td>
                  <td>
                    <img src={country.flags?.png} alt="Flag" className="flag-img" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}