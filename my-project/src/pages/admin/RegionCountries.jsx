import { useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const RegionCountries = () => {
  const [region, setRegion] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchRegionCountries = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/country/region',
        { region },
        {
          headers: { 'x-api-key': apiKey },
          withCredentials: true,
        }
      );
      setData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Region fetch failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Countries by Region</h1>
      <input className="border p-2 mb-2" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Enter region" />
      <input className="border p-2 mb-2" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter API Key" />
      <button onClick={fetchRegionCountries} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Fetch</button>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {data.length > 0 && <Table columns={["name", "currency", "capital", "languages", "flag"]} data={data} />}
    </div>
  );
};

export default RegionCountries;
