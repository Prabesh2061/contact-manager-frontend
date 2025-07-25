import { useState } from "react";
import data from '../data/data.js';

export default function SignUpForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await data.createUser(username, email, password);
      if (res._id && res.email) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          setMessage("");
          onSwitchToLogin();
        }, 2000);
      } else if (res.message) {
        setMessage(res.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Registration failed. Please try again.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setMessage(err.message || "Registration failed. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`w-full glass-card rounded-2xl shadow-xl p-8`}>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create Account</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            name="email"
            placeholder="Email address"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            placeholder="Password"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {message && (
            <div className="text-red-500 text-center text-sm">{message}</div>
          )}
          <button
            className="bg-gradient-to-r from-pink-400 to-blue-400 text-white font-bold py-2 rounded-lg mt-2 hover:from-pink-500 hover:to-blue-500 transition"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-gray-700 mt-4 text-center">
            Already have an account?{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={onSwitchToLogin}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}