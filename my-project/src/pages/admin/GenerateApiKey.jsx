import { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateApiKey = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const generateKey = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/genarateApiKey',
        { email, password },
        { withCredentials: true }
      );
      setApiKey(response.data.APIKey);
    } catch (err) {
      setError(err.response?.data?.message || 'Key generation failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Generate API Key
      </h1>

      <div className="flex flex-col gap-4">
        <input
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={generateKey}
          className="bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-md transition duration-300 shadow"
        >
          Generate Key
        </button>
      </div>

      {apiKey && (
        <div className="mt-6 bg-green-50 text-green-700 border border-green-300 p-3 rounded text-center">
          <p className="font-medium">API Key generated successfully:</p>
          <code className="block mt-2 text-sm break-all">{apiKey}</code>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 border border-red-300 p-3 rounded text-center font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default GenerateApiKey;
