import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";

const Sidebar = ({ onLogout, isOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 h-full left-0 bg-white w-64 p-6 shadow-lg lg:static lg:transform-none lg:translate-x-0 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
          <button onClick={toggleSidebar} className="text-gray-700">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div>
          <div className="flex items-center">
            <div className=" mr-4">
              <img src={user} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Mark Wood
              </h2>
              <p className="text-sm text-gray-500">marki@demo.com</p>
            </div>
          </div>
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
            onClick={toggleSidebar}
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
            onClick={toggleSidebar}
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
            onClick={toggleSidebar}
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
            onClick={toggleSidebar}
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
            onClick={toggleSidebar}
          >
            Inventory
          </NavLink>
          <button
            className="block py-2.5 px-4 mt-10 text-red-500 border-t border-gray-200"
            onClick={() => {
              handleLogout();
              toggleSidebar();
            }}
          >
            Logout
          </button>
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
