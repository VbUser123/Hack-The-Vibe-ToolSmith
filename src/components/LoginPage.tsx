import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: 'home' | 'profile') => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        onNavigate('profile');
      } else {
        // Mock signup - just redirect to login
        setIsLogin(true);
        setError('');
        alert('Account created! Please log in.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      {/* Add top padding for desktop navigation */}
      <div className="pt-16 md:pt-20 py-8 w-full">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Join Toolsmith Hub'}
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 text-indigo-600 mr-2" />
                    <label className="font-medium text-gray-700">Full Name</label>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
              )}

              <div>
                <div className="flex items-center mb-2">
                  <Mail className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="font-medium text-gray-700">Email Address</label>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="font-medium text-gray-700">Password</label>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin inline-block w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="inline-block w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                {' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}