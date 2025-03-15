import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function GenerateApiKey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(""); 

  const generateApiKey = async () => {
    setError(""); 
    try {
      const response = await axios.post(
        "http://localhost:3001/api/genarateApiKey",
        { email, password },
        {
          withCredentials: true, 
        }
      );
      setApiKey(response.data.APIKey);
    } catch (err) {
      console.error("API Key Generation Error:", err); 
      setError(err.response?.data?.message || "Failed to generate API Key");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="section">
      <Navbar />
      <h2>Generate API Key</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-green" onClick={generateApiKey}>
        Generate API Key
      </button>

      {apiKey && (
        <p  className="api-key">
          <strong>API Key:</strong>{" "}
          <span>{apiKey}</span>
        </p>
      )}

      {error && <p className="error-message">{error}</p>} 
    </div>
  );
}
