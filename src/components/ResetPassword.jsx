import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("https://saa-s-login-register-app.vercel.app/auth/verify-reset-otp", {
        email,
        code: otp,
      });

      setVerified(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    
    try {
      await axios.post("https://saa-s-login-register-app.vercel.app/auth/reset-password", {
        email,
        code: otp,
        newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md text-center space-y-4 sm:space-y-6">
          <div className="mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-600">
            Password Reset Successfully!
          </h2>
          <Link
            to="/auth/login"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-4 sm:space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full mb-4">
            <span className="text-white font-bold text-lg sm:text-xl">G</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Enter the OTP sent to <strong>{email}</strong>
          </p>
        </div>

        {!verified ? (
          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter 6-digit OTP"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className={`w-full bg-green-500 text-white py-2 sm:py-3 px-4 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="New Password"
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="Confirm Password"
              />
            </div>
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full bg-yellow-400 text-white py-2 sm:py-3 px-4 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-500"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;