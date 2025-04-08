import { useState, useEffect } from 'react';
import axios from 'axios';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formatCountries = (rawData) => {
    return rawData.map((c) => {
      const currencyNames = c.currencies
        ? Object.values(c.currencies).map((cur) => cur.name).join(', ')
        : 'N/A';
      const languageNames = c.languages
        ? Object.values(c.languages).join(', ')
        : 'N/A';

      return {
        name: c.name?.common || 'N/A',
        capital: c.capital?.[0] || 'N/A',
        currency: currencyNames,
        languages: languageNames,
        flag: c.flags?.png || c.flag || '🏳️',
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

  const columns = ['name', 'capital', 'currency', 'languages', 'flag'];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> All Countries API</h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
        />
        <button
          onClick={fetchCountries}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold shadow"
        >
          Fetch All
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center font-medium bg-red-100 border border-red-300 rounded p-2 mb-4">
          {error}
        </p>
      )}

      {countries.length > 0 ? (
        <div className="overflow-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-700 uppercase text-xs font-semibold tracking-wider text-center">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-6 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-100">
              {countries.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 font-medium">{c.name}</td>
                  <td className="px-6 py-3">{c.capital}</td>
                  <td className="px-6 py-3">{c.currency}</td>
                  <td className="px-6 py-3">{c.languages}</td>
                  <td className="px-6 py-3">
                    <img
                      src={c.flag}
                      alt="Flag"
                      className="w-10 h-6 object-cover rounded border border-gray-300 mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No countries fetched yet.</p>
      )}
    </div>
  );
};

export default AllCountries;
