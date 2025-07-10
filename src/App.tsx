import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PromoBar } from "@/components/layout/PromoBar";
import { ModernHeader } from "@/components/layout/ModernHeader";
import { ModernSidebar } from "@/components/layout/ModernSidebar";
import { CreationCards } from "@/components/dashboard/CreationCards";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
        <div className="min-h-screen bg-background">
          <PromoBar />
          <ModernHeader
            isAuthenticated={true}
            onSignIn={() => {}}
            onSignUp={() => {}}
            onSignOut={handleSignOut}
          />
          <div className="flex">
            <ModernSidebar
              isCollapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <main
              className="flex-1 transition-all duration-300 ease-in-out p-8"
              style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}
            >
              <CreationCards />
            </main>
          </div>
        </div>
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
