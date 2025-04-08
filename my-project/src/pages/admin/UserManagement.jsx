// ✅ UserManagement.jsx (fixed for userRole 0/1 logic)
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/users', {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [error]);
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/user/${id}`, {
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
      console.error(err);
    }
  };

  const toggleRole = async (id, currentRole) => {
    try {
      const newRole = currentRole === 1 ? 0 : 1;
      await axios.put(
        `http://localhost:3001/api/user/${id}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError('Failed to update role');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.userRole === 1 ? 'admin' : 'user'}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => toggleRole(user.id, user.userRole)}
                  className="bg-yellow-500 px-2 py-1 text-white rounded"
                >
                  Toggle Role
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 px-2 py-1 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;