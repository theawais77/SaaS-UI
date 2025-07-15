
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
      await axios.post("http://localhost:3000/auth/forgot-password", { email });
      navigate("/auth/reset-password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600 text-sm mt-1">
            Enter your email to receive a verification code
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-full font-semibold"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          <Link to="/auth/login" className="text-purple-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


