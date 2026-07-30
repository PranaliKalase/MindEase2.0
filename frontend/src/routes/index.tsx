import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LandingPage } from '../pages/Landing/LandingPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { RegisterPage } from '../pages/Register/RegisterPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ResetPasswordPage } from '../pages/ResetPassword';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';

interface TransitionContextType {
  navigateToAuth: (mode?: 'login' | 'signup') => void;
  isTransitioning: boolean;
}

export const TransitionContext = React.createContext<TransitionContextType>({
  navigateToAuth: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => React.useContext(TransitionContext);

export const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const navigateToAuth = (mode: 'login' | 'signup' = 'login') => {
    setIsTransitioning(true);
    // Smooth cinematic transition delay
    setTimeout(() => {
      navigate(mode === 'signup' ? '/register' : '/login');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 450);
  };

  return (
    <AuthProvider>
      <TransitionContext.Provider value={{ navigateToAuth, isTransitioning }}>
        <div className={`transition-all duration-500 min-h-screen bg-[#0B1026] ${isTransitioning ? 'page-zoom-out' : ''}`}>
          
          {/* Ambient Transition Light Curtain overlay when animating */}
          {isTransitioning && (
            <div className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-tr from-[#8A5CFF]/20 via-[#0B1026]/80 to-[#F5A5D5]/20 backdrop-blur-xl animate-pulse" />
          )}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage initialMode="login" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Sanctuary Routes */}
            {['/dashboard', '/journal', '/letters', '/relief', '/gratitude', '/community', '/clubs', '/analytics', '/profile', '/settings'].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Catch-all fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </TransitionContext.Provider>
    </AuthProvider>
  );
};
