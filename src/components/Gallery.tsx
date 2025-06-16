import React, { useState } from 'react';
import { Heart, ExternalLink, Coffee, Search, Filter, DollarSign, X } from 'lucide-react';
import { Tool, MonetizationStats } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface GalleryProps {
  onNavigate: (page: 'builder' | 'login') => void;
}

export default function Gallery({ onNavigate }: GalleryProps) {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMonetizeModal, setShowMonetizeModal] = useState(false);
  const [selectedToolStats, setSelectedToolStats] = useState<MonetizationStats | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Mock data for demonstration
  const tools: Tool[] = [
    {
      id: '1',
      title: 'Meme Caption Generator',
      description: 'Type a scenario, get a meme with AI-generated captions and matching scenes.',
      tags: ['memes', 'creativity', 'fun'],
      creator: 'MemeGenie',
      likes: 224,
      createdAt: new Date('2025-06-10'),
      revenue: 1200
    },
    {
      id: '2',
      title: 'Color Palette Extractor',
      description: 'Upload an image and get a beautiful color palette and UI theme suggestions.',
      tags: ['design', 'colors', 'palette'],
      creator: 'ColorCraft',
      likes: 185,
      createdAt: new Date('2025-06-11'),
      revenue: 1150
    },
    {
      id: '3',
      title: 'Reel Script Generator',
      description: 'Generate short-form content scripts for Reels and TikToks from a topic.',
      tags: ['content', 'video', 'scripts'],
      creator: 'ReelSmith',
      likes: 201,
      createdAt: new Date('2025-06-12'),
      revenue: 900
    },
    {
      id: '4',
      title: 'Visual Moodboard Maker',
      description: 'Type a concept, get a moodboard of images, colors, and styles.',
      tags: ['aesthetics', 'design', 'moodboard'],
      creator: 'VibeCraft',
      likes: 132,
      createdAt: new Date('2025-06-13'),
      revenue: 750
    },
    {
      id: '5',
      title: 'AI Poster Designer',
      description: 'Give a theme and title, and auto-generate a poster layout with visuals.',
      tags: ['poster', 'design', 'templates'],
      creator: 'PosterBot',
      likes: 176,
      createdAt: new Date('2025-06-13'),
      revenue: 980
    },
    {
      id: '6',
      title: 'Instagram Carousel Builder',
      description: 'Generate a multi-slide carousel post from a blog or idea instantly.',
      tags: ['content', 'instagram', 'carousel'],
      creator: 'SlideSavvy',
      likes: 149,
      createdAt: new Date('2025-06-13'),
      revenue: 650
    }
  ];

  const filters = [
    { id: 'all', label: 'All Tools' },
    { id: 'design', label: 'Design' },
    { id: 'memes', label: 'Memes' },
    { id: 'video', label: 'Video' },
    { id: 'content', label: 'Content Creation' }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || tool.tags.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const handleMonetizeClick = (tool: Tool) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    const mockStats: MonetizationStats = {
      toolName: tool.title,
      totalRevenue: tool.revenue || 0,
      usersSubscribed: Math.floor((tool.revenue || 0) / 15) // Mock calculation
    };
    setSelectedToolStats(mockStats);
    setShowMonetizeModal(true);
  };

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    // Handle like functionality for authenticated users
    alert('Tool liked! (This is a demo)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Add top padding for desktop navigation */}
      <div className="pt-16 md:pt-20 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Tool Gallery
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing tools created by our community
            </p>
            
            <button
              onClick={() => onNavigate('builder')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Your Own Tool
            </button>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tools..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="pl-12 pr-8 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 bg-white appearance-none cursor-pointer"
                  >
                    {filters.map(filter => (
                      <option key={filter.id} value={filter.id}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredTools.map(tool => (
              <div key={tool.id} className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Tool Preview */}
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl h-40 mb-6 flex items-center justify-center">
                  <div className="text-6xl opacity-50">
                    {tool.tags.includes('calculator') ? '🧮' :
                     tool.tags.includes('timer') ? '⏰' :
                     tool.tags.includes('todo') ? '📝' :
                     tool.tags.includes('design') ? '🎨' :
                     tool.tags.includes('security') ? '🔒' : '🛠️'}
                  </div>
                </div>
                
                {/* Tool Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{tool.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map(tag => (
                    <span key={tag} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Creator and Stats */}
                <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                  <span>by {tool.creator}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{tool.likes}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Try Tool
                  </button>
                  <button 
                    onClick={handleLikeClick}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleMonetizeClick(tool)}
                    className="bg-green-100 hover:bg-green-200 text-green-600 p-3 rounded-xl transition-colors"
                  >
                    <DollarSign className="h-4 w-4" />
                  </button>
                  {tool.supportLink && (
                    <button className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-3 rounded-xl transition-colors">
                      <Coffee className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 rounded-2xl w-fit mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
              <p className="text-gray-600 mb-6">Please log in to like tools and access monetization features.</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    onNavigate('login');
                  }}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monetization Modal */}
      {showMonetizeModal && selectedToolStats && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowMonetizeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl w-fit mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Tool Monetized</h2>
              <h3 className="text-lg font-semibold text-gray-700 mb-6">{selectedToolStats.toolName}</h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    ₹{selectedToolStats.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {selectedToolStats.usersSubscribed}
                  </div>
                  <div className="text-sm text-gray-600">Users Subscribed</div>
                </div>
              </div>
              
              <button
                onClick={() => setShowMonetizeModal(false)}
                className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}