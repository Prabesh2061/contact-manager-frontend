import { useState } from "react";
import { useNavigate } from "react-router";
import data from '../data/data.js';

export default function LoginForm({ onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await data.userLogin(email, password);
      setLoading(false);
      if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);
        navigate("/dashboard");
      } else {
        setMessage(res.message || "Login failed. Please check your credentials.");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      setLoading(false);
      setMessage("Login failed. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`w-full glass-card rounded-2xl shadow-xl p-8`}>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email address"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="password"
            placeholder="Password"
            className="bg-white/60 text-gray-800 border border-gray-200 rounded-lg p-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600 cursor-pointer" htmlFor="remember-me">
              <input className="mr-2" id="remember-me" type="checkbox" />
              Remember me
            </label>
            <a className="text-sm text-blue-500 hover:underline" href="#">Forgot password?</a>
          </div>
          {message && (
            <div className="text-red-500 text-center text-sm">{message}</div>
          )}
          <button
            className="bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold py-2 rounded-lg mt-2 hover:from-blue-500 hover:to-pink-500 transition cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-gray-700 mt-4 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={onSwitchToSignup}
            >
              Signup
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}