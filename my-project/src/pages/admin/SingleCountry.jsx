import { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const SingleCountry = () => {
  const [countryName, setCountryName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [country, setCountry] = useState([]);
  const [error, setError] = useState('');

  const formatCountry = (c) => {
    const currencyNames = c.currencies ? Object.values(c.currencies).map(cur => cur.name).join(", ") : "N/A";
    const languageNames = c.languages ? Object.values(c.languages).join(", ") : "N/A";

    return {
      name: c.name?.common || "N/A",
      capital: c.capital?.[0] || "N/A",
      currency: currencyNames,
      languages: languageNames,
      flag: c.flag || c.flags?.png || "🏳️",
    };
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);
  const fetchSingleCountry = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/country/getSingleCountry',
        { countryName },
        {
          headers: { 'x-api-key': apiKey },
          withCredentials: true,
        }
      );
      const formatted = response.data.data.map(formatCountry);
      setCountry(formatted);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch country');
    }
  };

  const columns = ["name", "capital", "currency", "languages", "flag"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Single Country</h1>
      <input
        className="border p-2 mb-2 mr-2"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
        placeholder="Enter Country Name"
      />
      <input
        className="border p-2 mb-2 mr-2"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter API Key"
      />
      <button onClick={fetchSingleCountry} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Search
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {country.length > 0 && <Table columns={columns} data={country} />}
    </div>
  );
};

export default SingleCountry;
