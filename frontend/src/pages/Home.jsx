import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-500 text-white text-center px-4">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Lead Management System</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Manage your leads efficiently and effectively with our simple and powerful tool.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
