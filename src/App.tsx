import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setCurrentView('auth');
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setCurrentView('auth');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const handleAuthCancel = () => {
    setCurrentView('landing');
  };

  const renderCurrentView = () => {
    if (currentView === 'auth') {
      return (
        <Auth 
          initialMode={authMode}
          onSuccess={handleAuthSuccess}
          onCancel={handleAuthCancel}
        />
      );
    }

    if (currentView === 'dashboard' || isAuthenticated) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      );
    }

    return (
      <Landing 
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderCurrentView()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
