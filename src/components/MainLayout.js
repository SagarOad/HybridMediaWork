// MainLayout.js
import React from "react";
import Sidebar from "./Sidebar"; // Import your Sidebar component

const MainLayout = ({ children, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onLogout={onLogout} /> {/* Render the sidebar */}
      <div className="flex-1 p-10 text-gray-800">{children}</div> {/* Render the main content */}
    </div>
  );
};

export default MainLayout;
