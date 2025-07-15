import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log("Login response:", res.data);
      if (res.data.id) {
        setUserId(res.data.id); 
        setStep("otp"); 
      }

      alert("OTP sent to your email");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/verify-otp", {
        email,
        code: otp,
      });

      alert("Logged in successfully!");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 items-center justify-center p-12">
        <div className="relative">
          <img
            src="/src/assets/images/spaceship.png"
            alt="Space illustration"
            className="w-96 h-90 object-contain"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <div className="space-y-6">
            {step === "login" ? (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-yellow-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-800"
                  >
                   <Link to="/auth/forgot-password">Recover Password</Link> 
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-yellow-400 text-white py-3 px-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300"
                >
                  Login
                </button>

                <div className="text-center mt-4 text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="text-yellow-500 hover:text-yellow-600 font-semibold transition-colors"
                  >
                   <Link to="/auth/register"> Register Now! </Link> 
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Enter the OTP sent to your email
                </h2>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
