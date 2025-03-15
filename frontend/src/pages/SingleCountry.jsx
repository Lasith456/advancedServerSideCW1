import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function SingleCountry() {
  const [country, setCountry] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);

  const fetchSingleCountry = async () => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
    setSingleCountry(response.data[0]);
  };

  return (
    <div className="section">
                    <Navbar/>
      
      <h2>Get Single Country</h2>
      <input type="text" placeholder="Enter Country Name" value={country} onChange={(e) => setCountry(e.target.value)} />
      <button className="btn btn-purple" onClick={fetchSingleCountry}>Fetch Country</button>
      {singleCountry && (
        <div className="country-details">
          <h3>{singleCountry.name.common}</h3>
          <p>Region: {singleCountry.region}</p>
          <p>Population: {singleCountry.population}</p>
        </div>
      )}
    </div>
  );
}
