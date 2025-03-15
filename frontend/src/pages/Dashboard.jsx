import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;
  return <h1>Welcome {user.email}</h1>;
}
