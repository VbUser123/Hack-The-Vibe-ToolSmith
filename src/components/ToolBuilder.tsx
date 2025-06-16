import React, { useState } from 'react';
import { Wand2, ArrowRight, Code, Lightbulb } from 'lucide-react';
import { GeneratedPreview } from '../types';
import { ProtectedRoute } from './ProtectedRoute';

interface ToolBuilderProps {
  onNavigate: (page: 'publish' | 'login', data?: GeneratedPreview) => void;
}

export default function ToolBuilder({ onNavigate }: ToolBuilderProps) {
  const [toolIdea, setToolIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<GeneratedPreview | null>(null);

  const handleGenerate = async () => {
    if (!toolIdea.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPreview: GeneratedPreview = {
        title: `${toolIdea.split(' ').slice(0, 3).join(' ')} Tool`,
        mockComponent: generateMockComponent(toolIdea),
        description: `A powerful tool for ${toolIdea.toLowerCase()}. This tool provides an intuitive interface with modern design and seamless functionality.`
      };
      
      setPreview(mockPreview);
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockComponent = (idea: string) => {
    const lowercaseIdea = idea.toLowerCase();
    
    if (lowercaseIdea.includes('calculator') || lowercaseIdea.includes('calc')) {
      return 'calculator';
    } else if (lowercaseIdea.includes('timer') || lowercaseIdea.includes('countdown')) {
      return 'timer';
    } else if (lowercaseIdea.includes('todo') || lowercaseIdea.includes('task')) {
      return 'todo';
    } else {
      return 'generic';
    }
  };

  const renderMockComponent = () => {
    switch (preview?.mockComponent) {
      case 'calculator':
        return (
          <div className="bg-gray-900 rounded-2xl p-6 text-white max-w-sm mx-auto">
            <div className="bg-gray-800 rounded-xl p-4 mb-4">
              <div className="text-right text-2xl font-mono">123,456</div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+'].map((btn) => (
                <button key={btn} className="bg-gray-700 hover:bg-gray-600 rounded-xl py-3 font-semibold transition-colors">
                  {btn}
                </button>
              ))}
              <button className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 col-span-2 font-semibold transition-colors">
                =
              </button>
            </div>
          </div>
        );
      
      case 'timer':
        return (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white max-w-sm mx-auto text-center">
            <div className="text-6xl font-mono mb-6">05:30</div>
            <div className="flex justify-center space-x-4">
              <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors">
                <div className="w-0 h-0 border-l-4 border-l-white border-y-4 border-y-transparent ml-1"></div>
              </button>
              <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </button>
              <button className="bg-white/20 hover:bg-white/30 rounded-full p-4 transition-colors">
                <div className="w-1 h-4 bg-white mx-1"></div>
                <div className="w-1 h-4 bg-white mx-1"></div>
              </button>
            </div>
          </div>
        );
      
      case 'todo':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">My Tasks</h3>
            <div className="space-y-3">
              {['Complete project proposal', 'Review design mockups', 'Schedule team meeting'].map((task, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${i === 0 ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                    {i === 0 && <div className="text-white text-xs flex items-center justify-center h-full">✓</div>}
                  </div>
                  <span className={`${i === 0 ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
              Add Task
            </button>
          </div>
        );
      
      default:
        return (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white max-w-sm mx-auto text-center">
            <Code className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-semibold mb-2">Custom Tool</h3>
            <p className="text-white/80">Your innovative tool interface will appear here</p>
            <div className="mt-6 space-y-2">
              <div className="bg-white/20 rounded-lg p-3 text-left">
                <div className="h-2 bg-white/40 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-white/30 rounded w-1/2"></div>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between">
                  <div className="h-8 w-16 bg-white/40 rounded"></div>
                  <div className="h-8 w-16 bg-white/40 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute onNavigate={onNavigate}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Add top padding for desktop navigation */}
        <div className="pt-16 md:pt-20 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Describe Your Tool
              </h1>
              <p className="text-xl text-gray-600">
                Tell us what you want to build, and we'll generate a preview for you
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-indigo-600 mr-2" />
                <label className="text-lg font-semibold text-gray-800">
                  What tool would you like to create?
                </label>
              </div>
              
              <textarea
                value={toolIdea}
                onChange={(e) => setToolIdea(e.target.value)}
                placeholder="e.g., A simple calculator for basic math operations, or a pomodoro timer to help with productivity, or a todo list for organizing tasks..."
                className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              />
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleGenerate}
                  disabled={!toolIdea.trim() || isGenerating}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin inline-block w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="inline-block w-5 h-5 mr-2" />
                      Generate Tool
                    </>
                  )}
                </button>
              </div>
            </div>

            {preview && (
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Preview Generated!</h2>
                  <p className="text-gray-600">Here's what your tool could look like</p>
                </div>
                
                <div className="mb-8">
                  {renderMockComponent()}
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{preview.title}</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{preview.description}</p>
                  
                  <button
                    onClick={() => onNavigate('publish', preview)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Publish This Tool
                    <ArrowRight className="inline-block w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}