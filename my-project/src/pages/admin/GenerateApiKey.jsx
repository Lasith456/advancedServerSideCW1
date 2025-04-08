import { useState } from 'react';
import axios from 'axios';

const GenerateApiKey = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Generate API Key</h1>
      <input className="border p-2 mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={generateKey} className="bg-green-600 text-white px-4 py-2 rounded">Generate</button>
      {apiKey && <p className="mt-4 text-green-600 font-bold">API Key: {apiKey}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default GenerateApiKey;