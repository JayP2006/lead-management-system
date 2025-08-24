import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Lead Management</h1>

      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-gray-200 hover:underline">Home</Link>
        {!token ? (
          <>
            <Link to="/register" className="hover:text-gray-200 hover:underline">Register</Link>
            <Link to="/login" className="hover:text-gray-200 hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link to="/leads" className="hover:text-gray-200 hover:underline">Leads</Link>
            <button onClick={handleLogout} className="hover:text-white hover:bg-red-500 px-3 py-1 rounded-md transition">
              Logout
            </button>
          </>
        )}
      </div>

      {token && (
        <div className="ml-6 flex items-center bg-blue-700 px-3 py-1 rounded-md">
          <span className="font-semibold">👋 Hi, {user?.fullName || "User"}</span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
