import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase';
import Header from './components/Header';
import Home from './pages/Home';
import ExplorePage from './pages/Explore';
import News from './pages/News';
import Actors from './pages/Actors';
import Rankings from './pages/Rankings';

import Calendar from './pages/Calendar';
import Support from './pages/Support';
import ShowDetail from './pages/ShowDetail';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AppProvider, useAppContext } from './context/AppContext';

// Loading Component
const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-purple-600/30 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-pink-600 rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-white font-medium animate-pulse">Cargando...</p>
    </div>
  </div>
);

// Page Transition Wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return (
    <div className="page-enter page-enter-active">
      {children}
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAppContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { loading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error getting redirect result:', error);
      }
    };

    checkRedirectResult();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route path="/explore" element={<PageWrapper><ExplorePage /></PageWrapper>} />
      <Route path="/news" element={<PageWrapper><News /></PageWrapper>} />
      <Route path="/actors" element={<PageWrapper><Actors /></PageWrapper>} />
      <Route path="/rankings" element={<PageWrapper><Rankings /></PageWrapper>} />

      <Route path="/calendar" element={<PageWrapper><Calendar /></PageWrapper>} />
      <Route path="/support" element={<PageWrapper><Support /></PageWrapper>} />
      <Route path="/show/:id" element={<ProtectedRoute><PageWrapper><ShowDetail /></PageWrapper></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
      <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
      <Route path="/signup" element={<PageWrapper><SignUpPage /></PageWrapper>} />
    </Routes>
  );
}

const App: React.FC = () => {
  useEffect(() => {
    // Add custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      width: 20px;
      height: 20px;
      border: 2px solid rgba(147, 51, 234, 0.5);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursor.style.borderColor = 'rgba(236, 72, 153, 0.8)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'rgba(147, 51, 234, 0.5)';
    };

    // Only add custom cursor on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', moveCursor);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cursor.remove();
    };
  }, []);

  return (
    <Router>
      <AppProvider>
        <div className="relative min-h-screen bg-black overflow-x-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            <main className="pt-20">
              <AppRoutes />
            </main>
          </div>

          {/* Noise Texture Overlay */}
          <div 
            className="fixed inset-0 z-20 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </AppProvider>
    </Router>
  );
};

export default App;