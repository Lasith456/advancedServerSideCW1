import { useEffect, useState } from 'react';
import axios from 'axios';

const UserApiUsageStatus = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/apiUsage', {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setStats(res.data.data);
      } catch (err) {
        console.error('Error fetching API usage:', err);
        setError(err.response?.data?.message || 'Failed to fetch usage data');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> API Key Usage Status</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 border border-red-300 rounded text-center mb-4 font-medium">
           {error}
        </div>
      )}

      {stats.length > 0 ? (
        <div className="overflow-x-auto shadow border border-gray-300 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 bg-white">
            <thead className="bg-gray-200 text-center uppercase text-gray-700 text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Usage Count</th>
                <th className="px-6 py-3">Last Used</th>
                <th className="px-6 py-3">Expire Date</th>
                <th className="px-6 py-3">Email</th>
              </tr>
            </thead>
            <tbody className="text-center divide-y divide-gray-100">
              {stats.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{item.username}</td>
                  <td className="px-6 py-3">{item.usage_count}</td>
                  <td className="px-6 py-3">
                    {item.last_used ? new Date(item.last_used).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-3">
                    {item.expires_at ? new Date(item.expires_at).toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-3">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No usage data available.</p>
      )}
    </div>
  );
};

export default UserApiUsageStatus;
