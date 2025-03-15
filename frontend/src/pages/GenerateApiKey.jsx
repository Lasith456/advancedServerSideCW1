import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function GenerateApiKey() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");

  const generateApiKey = async () => {
    const response = await axios.post(
      "http://localhost:3001/api/genarateApiKey",
      { email, password },
      {
        withCredentials: true, 
      }
    );
    setApiKey(response.data.APIKey);
  };
  
  return (
    <div className="section">
                    <Navbar/>
      
      <h2>Generate API Key</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-green" onClick={generateApiKey}>Generate API Key</button>
      {apiKey && <p className="api-key">API Key: {apiKey}</p>}
    </div>
  );
}
