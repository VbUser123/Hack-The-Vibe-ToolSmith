import React from 'react';
import { Hammer, Sparkles, Users, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onNavigate: (page: 'builder' | 'login' | 'profile') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Add top padding for desktop navigation */}
      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl mr-4">
                <Hammer className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Toolsmith Hub
              </h1>
            </div>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
              Describe your tool idea, preview it, and share it with the world.
            </p>
            
            {/* Description */}
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into interactive tools with the power of AI. 
              No coding required – just describe what you need, and watch it come to life.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => onNavigate('builder')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="inline-block w-5 h-5 mr-2" />
                Start Building
              </button>
              {!isAuthenticated ? (
                <button
                  onClick={() => onNavigate('login')}
                  className="border-2 border-indigo-200 text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('profile')}
                  className="border-2 border-indigo-200 text-indigo-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                >
                  View Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl w-fit mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Instant Preview</h3>
              <p className="text-gray-600">
                See your tool come to life instantly with AI-generated previews and mockups.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-2xl w-fit mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Share & Discover</h3>
              <p className="text-gray-600">
                Publish your tools to the community and discover amazing creations from others.
              </p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl w-fit mb-4">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No Code Required</h3>
              <p className="text-gray-600">
                Build sophisticated tools using natural language – no programming knowledge needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}