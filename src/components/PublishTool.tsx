import React, { useState } from 'react';
import { Upload, Tag, Link, User } from 'lucide-react';
import { GeneratedPreview } from '../types';

interface PublishToolProps {
  onNavigate: (page: 'gallery') => void;
  previewData?: GeneratedPreview;
}

export default function PublishTool({ onNavigate, previewData }: PublishToolProps) {
  const [title, setTitle] = useState(previewData?.title || '');
  const [description, setDescription] = useState(previewData?.description || '');
  const [tags, setTags] = useState('');
  const [supportLink, setSupportLink] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing
    setTimeout(() => {
      setIsPublishing(false);
      onNavigate('gallery');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Add top padding for desktop navigation */}
      <div className="pt-16 md:pt-20 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Publish Your Tool
            </h1>
            <p className="text-xl text-gray-600">
              Add some details to help others discover your creation
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
            <form className="space-y-6">
              {/* Title */}
              <div>
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="text-lg font-semibold text-gray-800">
                    Tool Title
                  </label>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your tool a catchy name"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center mb-3">
                  <Upload className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="text-lg font-semibold text-gray-800">
                    Description
                  </label>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your tool does and how it helps people"
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Tags */}
              <div>
                <div className="flex items-center mb-3">
                  <Tag className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="text-lg font-semibold text-gray-800">
                    Tags
                  </label>
                </div>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="calculator, productivity, utility (separate with commas)"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Add relevant tags to help others find your tool
                </p>
              </div>

              {/* Support Link */}
              <div>
                <div className="flex items-center mb-3">
                  <Link className="h-5 w-5 text-indigo-600 mr-2" />
                  <label className="text-lg font-semibold text-gray-800">
                    Support Link (Optional)
                  </label>
                </div>
                <input
                  type="url"
                  value={supportLink}
                  onChange={(e) => setSupportLink(e.target.value)}
                  placeholder="https://ko-fi.com/yourname or UPI ID"
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Let supporters buy you a coffee or contribute to your work
                </p>
              </div>

              {/* Preview Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Preview</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2">{title || 'Your Tool Title'}</h4>
                  <p className="text-gray-600 text-sm mb-3">{description || 'Your tool description will appear here'}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>by You</span>
                    <div className="flex space-x-2">
                      <span>👍 0</span>
                      <span>Try Tool</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Publish Button */}
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={!title.trim() || !description.trim() || isPublishing}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                >
                  {isPublishing ? (
                    <>
                      <div className="animate-spin inline-block w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Publishing...
                    </>
                  ) : (
                    'Publish Tool'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}