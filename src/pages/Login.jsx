import { useState } from "react";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignupForm';

export default function Login() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">
      {/* Decorative pastel blobs */}
      <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-pink-300 opacity-40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-8rem] right-[-8rem] w-[32rem] h-[32rem] bg-blue-300 opacity-30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-purple-300 opacity-20 rounded-full blur-2xl -z-10"></div>
      {/* Main content */}
      <div className="w-full max-w-md px-4">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">Contact Manager App</h1>
        {showLogin ? (
          <LoginForm
            onSwitchToSignup={() => setShowLogin(false)}
          />
        ) : (
          <SignUpForm
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )}
      </div>
    </div>
  )
}