import React, { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        alert("User registered successfully!");
        // Optionally, redirect to login page or clear form
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(errorData.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred");
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = "http://localhost:3000/auth/google";
  };

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "India",
    "Pakistan",
    "Brazil",
    "Morocco",
    "UAE",
    "Saudi Arabia",
    "Qatar",
    "Indonesia",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Afghanistan",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {" "}
      {/* Mobile Header with Logo - Only visible on mobile */}{" "}
      <div className="lg:hidden bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 text-center">
        {" "}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
          {" "}
          <span className="text-white font-bold text-xl">G</span>{" "}
        </div>{" "}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {" "}
          Create Account!{" "}
        </h1>{" "}
        <p className="text-gray-600">Join us today</p>{" "}
      </div>
      {/* Left side - Illustration (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-12">
        {" "}
        <div className="relative">
          {" "}
          <img
            src="/src/assets/images/spaceship.png"
            alt="Space illustration"
            className="w-96 h-96 object-contain"
          />
          {/* Desktop indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-64 h-4 bg-gray-300 rounded-full opacity-50"></div>
            <div className="w-48 h-2 bg-gray-400 rounded-full opacity-30 mx-auto mt-1"></div>
          </div>
        </div>
      </div>
      {/* Right side - Register Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo - Only visible on desktop */}
          <div className="hidden lg:block text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create Account!
            </h1>
            <p className="text-gray-600">Join us today</p>
          </div>

          {/* Register Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors text-base"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors text-base"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors text-base"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors text-base bg-white"
                required
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 text-white py-3 px-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300"
            >
              Create Account
            </button>
          </div>

          {/* Or Continue With Section */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or Continue With
                </span>
              </div>
            </div>

            {/* Google Sign-in Button */}
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              className="text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
            >
              Sign In Here!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
