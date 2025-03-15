import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/auth/user", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3001/api/authenticate", { email, password }, { withCredentials: true });
    setUser(res.data);
  };

  const logout = () => {
    axios.post("http://localhost:3001/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
