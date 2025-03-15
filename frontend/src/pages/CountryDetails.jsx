import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function CountryDetails() {
  const [countries, setCountries] = useState([]);

  const fetchAllCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(response.data.slice(0, 5));
  };

  return (
    <div className="section">
                    <Navbar/>
      
      <h2>Get All Countries</h2>
      <button className="btn btn-blue" onClick={fetchAllCountries}>Fetch Countries</button>
      {countries.length > 0 && (
        <ul className="country-list">
          {countries.map((c, idx) => (
            <li key={idx}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
