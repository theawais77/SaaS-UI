import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("https://saa-s-login-register-app.vercel.app/auth/forgot-password", { email });
      navigate("/auth/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full mb-4">
            <span className="text-white font-bold text-lg sm:text-xl">G</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Enter your email to receive a verification code
          </p>
        </div>

        <div className="mt-4 sm:mt-6 space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter your email"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className={`w-full bg-yellow-400 text-white py-2 sm:py-3 px-4 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-500"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            <Link 
              to="/auth/login" 
              className="text-yellow-500 hover:text-yellow-600 font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;