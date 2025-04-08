import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

const UserApiUsageStatus = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

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
    <div>
      <h1 className="text-2xl font-bold mb-4">My API Key Usage Status</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Table
        columns={["username", "usage_count", "last_used", "email"]}
        data={stats}
      />
    </div>
  );
};

export default UserApiUsageStatus;
