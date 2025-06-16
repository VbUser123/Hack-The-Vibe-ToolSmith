import React, { useState } from 'react';
import { PageType } from './types';
import { GeneratedPreview } from './types';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import ToolBuilder from './components/ToolBuilder';
import PublishTool from './components/PublishTool';
import Gallery from './components/Gallery';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import Navigation from './components/Navigation';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [previewData, setPreviewData] = useState<GeneratedPreview | undefined>();

  const handleNavigate = (page: PageType, data?: GeneratedPreview) => {
    setCurrentPage(page);
    if (data) {
      setPreviewData(data);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'builder':
        return <ToolBuilder onNavigate={handleNavigate} />;
      case 'publish':
        return <PublishTool onNavigate={handleNavigate} previewData={previewData} />;
      case 'gallery':
        return <Gallery onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
        {renderCurrentPage()}
        {/* Add bottom padding for mobile navigation */}
        <div className="pb-20 md:pb-0"></div>
      </div>
    </AuthProvider>
  );
}

export default App;