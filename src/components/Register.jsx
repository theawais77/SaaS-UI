import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { username, email, password, phone, country } = formData;
    if (!username || !email || !password || !phone || !country) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Invalid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post("https://saa-s-login-register-app.vercel.app/auth/register", formData);
      console.log("Registration successful:", res.data);
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://saa-s-login-register-app.vercel.app/auth/google";
  };

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany",
    "France", "Japan", "South Korea", "India", "Pakistan", "Brazil", "Morocco",
    "UAE", "Saudi Arabia", "Qatar", "Indonesia", "Bangladesh", "Sri Lanka",
    "Nepal", "Afghanistan"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-br from-blue-50 to-purple-50 py-6 px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full mb-3 sm:mb-4">
          <span className="text-white font-bold text-lg sm:text-xl">G</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Create Account!</h1>
        <p className="text-sm sm:text-base text-gray-600">Join us today</p>
      </div>

      {/* Desktop Illustration */}
      <div className="lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-8 lg:p-12">
        <div className="relative max-w-md w-full">
          <img 
            src="/spaceship.png" 
            alt="Space illustration" 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {/* Desktop Header (hidden on mobile) */}
          <div className="hidden lg:block text-center mb-6 lg:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full mb-3 sm:mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">G</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Create Account!</h1>
            <p className="text-sm sm:text-base text-gray-600">Join us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {["username", "email", "password", "phone"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 capitalize"
                >
                  {field === "email" ? "Email Address" : field === "phone" ? "Phone Number" : field}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-colors"
                  placeholder={`Enter your ${field === "email" ? "email address" : field}`}
                />
              </div>
            ))}

            {/* Country Dropdown */}
            <div>
              <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
              >
                <option value="">Select your country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-xs sm:text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-yellow-400 text-white py-2 sm:py-3 px-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-500"
              }`}
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or Continue With</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xs sm:text-sm text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-gray-600 mt-4 sm:mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-yellow-500 hover:text-yellow-600 font-medium">
              Sign In Here!
            </Link>
          </p>
        </div>
      </div>
      <div className="py-3 text-center text-xs text-gray-500 lg:absolute lg:bottom-4 lg:left-1/2 lg:transform lg:-translate-x-1/2">
        © 2023 GrowthX. All Rights Reserved. Designed, Built & Maintained by Sid
      </div>
    </div>
  );
};

export default RegisterPage;