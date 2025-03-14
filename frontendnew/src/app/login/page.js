"use client"; // Ensure this is a Client Component

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:3001/api/login", { email, password }, { 
        withCredentials: true, 
      });
      alert(response.data.message);
      if(response.data.role=='admin'){
        router.push("/dashboard/admin");
      }else{
        router.push("/dashboard/user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 text-sm">Email</label>
            <input type="email" className="w-full text-gray-600 px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mt-3">
            <label className="block text-gray-600 text-sm">Password</label>
            <input type="password" className="w-full px-4 py-2 mt-1 border rounded-md"
              placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="w-full mt-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link href="/register" className="text-blue-500">Register here</Link>
        </p>
      </div>
    </div>
  );
}
