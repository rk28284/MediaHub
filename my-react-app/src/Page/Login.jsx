import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading ...", {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        icon: "⏳", // You can use any emoji or icon
        style: { border: "2px solid yellow", color: "black" }, // Custom styles
      })
  
    try {
      const response = await axios.post(
        "https://mediahub-backend-cekl.onrender.com/login",
        formData
      );
  
      toast.dismiss(toastId);
      toast.success("Login successful!");
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/dashboard");
    } catch (error) {
      toast.dismiss(toastId);
      if (error.response) {
        toast.error(error.response.data.message || "Login failed! Please try again.");
      } else if (error.request) {
        toast.error("Network error! Please try again.");
      } else {
        toast.error("Login failed! Please try again.");
      }
      console.error("Login error:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? {" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};
