// src/pages/Register.js
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import shoppingImg from "../assets/shopping.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(name, email, password);
      toast.success('Registration successful! Redirecting to login...');
      // Clear the fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-purple-100">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#89089f]">
        <div className="text-white text-center px-8">
          <img
            src={shoppingImg}
            alt="Welcome"
            className="w-[300px] md:w-[400px] mx-auto mb-6"
          />
          <h1 className="text-2xl md:text-4xl font-bold">Welcome to our shop</h1>
          <p className="mt-2">Purchase imported shoes</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Registration</h2>
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

      {/* Toast Container */}
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;
