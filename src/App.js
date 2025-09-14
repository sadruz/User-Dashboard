import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './Login.js';
import List from './List.js';
import Details from './Details.js';
import PhotoResult from './PhotoResult.js';
import BarGraph from './BarGraph.js';
import Map from './Map.js';
import MainLayout from './MainLayout.js';
import 'leaflet/dist/leaflet.css';

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? <MainLayout /> : <Navigate to="/" />;
};

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

// Component to wrap each page with animation
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function App() {
  // 1. Get the current location from the router
  const location = useLocation();

  return (
    // AnimatePresence is what enables the exit animations
    <AnimatePresence mode="wait">
      {/* 2. Pass the location and a unique key to the Routes component.
          This is the critical part that tells React to re-render and animate
          when the URL pathname changes. */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Login /></AnimatedPage>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/list" element={<AnimatedPage><List /></AnimatedPage>} />
          <Route path="/details/:id" element={<AnimatedPage><Details /></AnimatedPage>} />
          <Route path="/photo-result" element={<AnimatedPage><PhotoResult /></AnimatedPage>} />
          <Route path="/bar-graph" element={<AnimatedPage><BarGraph /></AnimatedPage>} />
          <Route path="/map" element={<AnimatedPage><Map /></AnimatedPage>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper component remains necessary because App uses hooks that need the Router context
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;