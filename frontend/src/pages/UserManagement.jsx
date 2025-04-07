import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Badge, Alert, Spinner, Table } from "react-bootstrap";
import { FaUserShield, FaUser, FaEdit } from "react-icons/fa";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const changeUserRole = async (userId, newRole) => {
    setUpdatingUser(userId);
    setError("");
    try {
      await axios.put(`http://localhost:3001/api/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Failed to update user role");
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">
          User Management
        </Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={user.role === "admin" ? "danger" : "info"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => changeUserRole(user.id, "admin")}
                        disabled={user.role === "admin" || updatingUser === user.id}
                      >
                        {updatingUser === user.id ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>
                            <FaUserShield className="me-1" /> Make Admin
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => changeUserRole(user.id, "user")}
                        disabled={user.role === "user" || updatingUser === user.id}
                      >
                        {updatingUser === user.id ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <>
                            <FaUser className="me-1" /> Make User
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        
        {users.length === 0 && (
          <p className="text-center text-muted my-5">No users found</p>
        )}
      </Card.Body>
    </Card>
  );
}
