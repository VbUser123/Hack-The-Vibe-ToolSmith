import React from 'react';
import { User, Calendar, TrendingUp, Heart, DollarSign } from 'lucide-react';
import { CreatedTool } from '../types';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

interface ProfileProps {
  onNavigate: (page: 'gallery' | 'login') => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const { user } = useAuth();

  const toolsCreated: CreatedTool[] = [
    { title: 'Meme Caption Generator', likes: 224, revenue: 1200 },
    { title: 'Reel Script Generator', likes: 201, revenue: 900 },
    { title: 'Color Palette Extractor', likes: 185, revenue: 1150 }
  ];

  const totalRevenue = toolsCreated.reduce((sum, tool) => sum + tool.revenue, 0);
  const totalLikes = toolsCreated.reduce((sum, tool) => sum + tool.likes, 0);

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Add top padding for desktop navigation */}
        <div className="pt-16 md:pt-20 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Profile Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-8 text-6xl">
                  👨‍💻
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    {user?.name || 'V B'}
                  </h1>
                  <p className="text-gray-600 mb-4 text-lg">
                    Creative developer passionate about building useful tools for everyone.
                  </p>
                  <div className="flex items-center justify-center md:justify-start text-gray-500 mb-6">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Joined June 2024</span>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {toolsCreated.length}
                      </div>
                      <div className="text-sm text-gray-600">Tools Created</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {totalLikes}
                      </div>
                      <div className="text-sm text-gray-600">Total Likes</div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        ₹{totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Created Tools Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Created Tools</h2>
              </div>
              
              <div className="space-y-4">
                {toolsCreated.map((tool, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {tool.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1 text-red-500" />
                            <span>{tool.likes} likes</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                            <span>₹{tool.revenue.toLocaleString()} revenue</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onNavigate('gallery')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        View Tool
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {toolsCreated.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛠️</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools created yet</h3>
                  <p className="text-gray-600 mb-6">Start building your first tool to see it here</p>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Create Your First Tool
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}