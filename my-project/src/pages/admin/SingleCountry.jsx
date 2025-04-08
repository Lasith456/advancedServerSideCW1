import { useState, useEffect } from 'react';
import axios from 'axios';

const SingleCountry = () => {
  const [countryName, setCountryName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [country, setCountry] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formatCountry = (c) => {
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
  };

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

  const columns = ['name', 'capital', 'currency', 'languages', 'flag'];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Search Single Country
      </h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
          placeholder="Enter Country Name"
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter API Key"
        />
      </div>

      <div className="text-center mb-6">
        <button
          onClick={fetchSingleCountry}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white px-6 py-2 rounded-lg font-semibold shadow"
        >
          Search Country
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 text-center p-3 rounded-md font-medium border border-red-300 mb-4">
          {error}
        </div>
      )}

      {country.length > 0 ? (
        <div className="overflow-x-auto shadow border border-gray-300 rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-200 text-center text-gray-700 font-semibold uppercase tracking-wide">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-6 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-100">
              {country.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3 font-medium">{c.name}</td>
                  <td className="px-6 py-3">{c.capital}</td>
                  <td className="px-6 py-3">{c.currency}</td>
                  <td className="px-6 py-3">{c.languages}</td>
                  <td className="px-6 py-3">
                    <img
                      src={c.flag}
                      alt="Flag"
                      className="w-10 h-6 object-cover border border-gray-300 rounded mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium">No country data yet. Try searching above.</p>
      )}
    </div>
  );
};

export default SingleCountry;
