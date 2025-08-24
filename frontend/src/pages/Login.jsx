import React, { useState } from "react";
import { post } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 👈 new state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // 👈 disable button

    try {
      let res = await post("/auth/login", { email, password });
      console.log("result is ", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        alert("Login successful");
        window.location.href = "/leads";
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false); // 👈 enable button again
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading} // 👈 disable button when loading
            className={`w-full py-2 rounded-md font-semibold text-white 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Submitting..." : "Login"} {/* 👈 text change */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
