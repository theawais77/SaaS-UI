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
      const res = await axios.post("https://saa-s-login-register-app.vercel.app/auth/login", {
        email,
        password,
      });

      if (res.data?.id) {
        setStep("otp");
        setOtp(""); // Clear OTP input
       
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
      const res = await axios.post("https://saa-s-login-register-app.vercel.app/auth/verify-otp", {
        email,
        code: otp,
      });
      navigate("/"); // Redirect to homepage/dashboard
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = () => {
    window.location.href = "https://saa-s-login-register-app.vercel.app/auth/google";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left side illustration (hidden on mobile) */}
      <div className="md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-4 lg:p-12">
        <div className="relative max-w-md w-full">
          <img
            src="/src/assets/images/spaceship.png"
            alt="Space illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full mb-3 sm:mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">G</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              {step === "login" ? "Welcome Back!" : "Verify OTP"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {step === "login" ? "Login to your account" : `OTP sent to ${email}`}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 mb-3 sm:mb-4 text-xs sm:text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            {step === "login" ? (
              <>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg"
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
                      className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-xs sm:text-sm text-gray-700">
                      Remember Me
                    </label>
                  </div>
                  <Link to="/auth/forgot-password" className="text-yellow-500 hover:text-yellow-600 text-xs sm:text-sm font-semibold">
                    Recover Password
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full bg-yellow-400 text-white py-2 sm:py-3 px-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 ${
                    loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-500"
                  }`}
                >
                  {loading ? "Sending OTP..." : "Login"}
                </button>
                
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
                        {/* Google Icon paths */}
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">Continue with Google</span>
                    </button>
                  </div>
                </div>

                {/* Link to Register */}
                <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
                  Don't have an account?{" "}
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
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg mb-3 sm:mb-4"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className={`w-full bg-green-500 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold text-sm sm:text-base ${
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
      <div className="py-3 text-center text-xs text-gray-500 md:absolute md:bottom-4 md:left-1/2 md:transform md:-translate-x-1/2">
        © 2023 GrowthX. All Rights Reserved. Designed, Built & Maintained by Sid
      </div>
    </div>
  );
};

export default LoginPage;