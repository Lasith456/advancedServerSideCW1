import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500">
            <FaUser className="text-gray-500 mr-2" />
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              className="w-full focus:outline-none"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border rounded-lg p-2 focus-within:ring-2 focus-within:ring-green-500">
            <FaLock className="text-gray-500 mr-2" />
            <input
              className="w-full focus:outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
