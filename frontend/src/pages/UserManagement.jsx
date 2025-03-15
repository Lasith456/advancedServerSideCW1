import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; 
import Navbar from "../components/Navbar";
export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const changeUserRole = async (userId, newRole) => {
    await axios.put(`http://localhost:3001/api/users/${userId}`, { role: newRole });
    alert("User role updated!");
  };

  return (
    <div className="section">
                    <Navbar/>
      <h2>User Management</h2>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p>{user.email} - {user.role}</p>
          <button className="btn btn-blue" onClick={() => changeUserRole(user.id, "admin")}>Make Admin</button>
          <button className="btn btn-red" onClick={() => changeUserRole(user.id, "user")}>Make User</button>
        </div>
      ))}
    </div>
  );
}
