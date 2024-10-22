// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ onLogout }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Mark Wood</h2>
        <p className="text-sm text-gray-500">marki@demo.com</p>
      </div>
      <nav className="mt-10">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-700 hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-700 hover:text-white"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-700 hover:text-white"
            }`
          }
        >
          Notifications
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-700 hover:text-white"
            }`
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded transition duration-200 ${
              isActive
                ? "bg-purple-700 text-white"
                : "hover:bg-purple-700 hover:text-white"
            }`
          }
        >
          Inventory
        </NavLink>
        <button
          className="block py-2.5 px-4 mt-10 text-red-500 border-t border-gray-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
