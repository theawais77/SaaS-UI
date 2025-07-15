import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form validation
  const validateLoginForm = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const validateOtp = () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateLoginForm()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      if (res.data?.id) {
        setStep("otp");
        setOtp(""); // Clear OTP input
        alert("OTP sent to your email");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");

    if (!validateOtp()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/verify-otp", {
        email,
        code: otp,
      });

      alert("Logged in successfully!");
      navigate("/"); // Redirect to homepage/dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side illustration (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-12">
        <div className="relative">
          <img
            src="/src/assets/images/spaceship.png"
            alt="Space illustration"
            className="w-96 h-90 object-contain"
          />
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === "login" ? "Welcome Back!" : "Verify OTP"}
            </h1>
            <p className="text-gray-600">
              {step === "login" ? "Login to your account" : `OTP sent to ${email}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 mb-4 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {step === "login" ? (
              <>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Remember Me and Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                      Remember Me
                    </label>
                  </div>
                  <Link to="/auth/forgot-password" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                    Recover Password
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full bg-yellow-400 text-white py-3 px-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-500"
                  }`}
                >
                  {loading ? "Sending OTP..." : "Login"}
                </button>

                {/* Link to Register */}
                <div className="text-center mt-4 text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-yellow-500 hover:text-yellow-600 font-semibold"
                  >
                    Register Now!
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className={`w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-green-600"
                  }`}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
        © 2023 GrowthX. All Rights Reserved. Designed, Built & Maintained by Sid
      </div>
    </div>
  );
};

export default LoginPage;
