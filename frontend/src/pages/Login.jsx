import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(email);
      const response = await axios.post(
        "http://localhost:3001/api/authenticate",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(response.data.message);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>
        <p className="text-white/80 text-center text-sm mt-1">Sign in to continue</p>

        {error && <p className="text-red-400 text-center mt-3">{error}</p>}

        <form className="mt-6" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="email"
              className="peer w-full text-white px-4 py-3 bg-transparent border-b-2 border-white/40 focus:border-white outline-none transition duration-300"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="absolute left-4 top-1/2 text-white/60 transform -translate-y-1/2 transition duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-focus:top-1/2 peer-focus:text-white">
              Email
            </label>
          </div>

          <div className="relative mt-6">
            <input
              type="password"
              className="peer w-full text-white px-4 py-3 bg-transparent border-b-2 border-white/40 focus:border-white outline-none transition duration-300"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="absolute left-4 top-1/2 text-white/60 transform -translate-y-1/2 transition duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/50 peer-focus:top-1/2 peer-focus:text-white">
              Password
            </label>
          </div>

          <button className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-lg transition">
            Login
          </button>
        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          Don't have an account? <a href="/register" className="text-white underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

