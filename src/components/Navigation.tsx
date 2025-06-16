import React from 'react';
import { Home, Hammer, Grid3X3, LogIn, User, LogOut } from 'lucide-react';
import { PageType } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const publicNavItems = [
    { id: 'home' as PageType, label: 'Home', icon: Home },
    { id: 'gallery' as PageType, label: 'Gallery', icon: Grid3X3 },
    { id: 'builder' as PageType, label: 'Create Tool', icon: Hammer },
  ];

  const authNavItems = isAuthenticated 
    ? [
        { id: 'profile' as PageType, label: 'Profile', icon: User },
        { id: 'logout' as PageType, label: 'Logout', icon: LogOut, action: handleLogout },
      ]
    : [
        { id: 'login' as PageType, label: 'Login', icon: LogIn },
      ];

  const allNavItems = [...publicNavItems, ...authNavItems];

  const handleNavClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl mr-3">
                <Hammer className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Toolsmith Hub
              </span>
            </button>
            
            {/* Navigation Items */}
            <div className="flex items-center space-x-1">
              {allNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-indigo-600 bg-indigo-50'
                      : item.id === 'logout'
                      ? 'text-red-600 hover:text-red-700 hover:bg-red-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          {allNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                currentPage === item.id
                  ? 'text-indigo-600 bg-indigo-50'
                  : item.id === 'logout'
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}