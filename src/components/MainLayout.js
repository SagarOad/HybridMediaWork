import React, { useState } from "react";
import Sidebar from "./Sidebar"; 
import { FiMenu } from "react-icons/fi";

const MainLayout = ({ children, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`fixed z-30 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 bg-white shadow-md lg:shadow-none`}
      >
        <Sidebar onLogout={onLogout} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 flex flex-col p-4 lg:p-10 text-gray-800">
        <div className="lg:hidden flex justify-between items-center mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 focus:outline-none"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-semibold">Your App Title</h1>
        </div>

        {children}
      </div>
    </div>
  );
};

export default MainLayout;
