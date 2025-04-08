import { useState,useEffect } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount or when error changes
    }
  }, [error]);
  const formatCountries = (rawData) => {
    return rawData.map((c) => {
      const currencyNames = c.currencies ? Object.values(c.currencies).map(cur => cur.name).join(", ") : "N/A";
      const languageNames = c.languages ? Object.values(c.languages).join(", ") : "N/A";

      return {
        name: c.name?.common || "N/A",
        capital: c.capital?.[0] || "N/A",
        currency: currencyNames,
        languages: languageNames,
        flag: c.flag || c.flags?.png || "🏳️",
      };
    });
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/country',
        {},
        {
          headers: { 'x-api-key': apiKey },
          withCredentials: true,
        }
      );
      const formatted = formatCountries(response.data.data);
      setCountries(formatted);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch countries');
    }
  };

  const columns = ["name", "capital", "currency", "languages", "flag"];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Countries</h1>
      <input
        className="border p-2 mb-4 mr-2"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter API Key"
      />
      <button onClick={fetchCountries} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Fetch All
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {countries.length > 0 && <Table columns={columns} data={countries} />}
    </div>
  );
};

export default AllCountries;

