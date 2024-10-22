// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import shoppingImg from "../assets/shopping.png";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-purple-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700">
        <div className="text-white text-center px-8">
          <img
            src={shoppingImg}
            alt="Welcome"
            className="w-[300px] md:w-[400px] mx-auto mb-6"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Welcome to our shop</h1>
          <p className="mt-2">Purchase imported shoes</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link to="/register" className="text-purple-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
