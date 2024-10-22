// src/pages/Register.js
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import shoppingImg from "../assets/shopping.png"

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      register(name, email, password);
      alert('Registration successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-100">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center bg-[#89089f]">
        <div className="text-white text-center px-8">
          <img
            src={shoppingImg}
            alt="Welcome"
            className=" w-[400px] mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold">Welcome to our shop</h1>
          <p className="mt-2">Purchase imported shoes</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
