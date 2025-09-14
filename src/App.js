import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.js';
import List from './List.js';
import Details from './Details.js';
import PhotoResult from './PhotoResult.js';
import BarGraph from './BarGraph.js';
import Map from './Map.js';
import MainLayout from './MainLayout.js'; // Import the new layout
import 'leaflet/dist/leaflet.css';

// This component protects routes that require authentication.
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  // If the user is authenticated, render the main layout which in turn renders the requested page.
  // Otherwise, redirect them to the login page.
  return isAuthenticated ? <MainLayout /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* All protected routes are now nested under the ProtectedRoute element */}
        <Route element={<ProtectedRoute />}>
          <Route path="/list" element={<List />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/photo-result" element={<PhotoResult />} />
          <Route path="/bar-graph" element={<BarGraph />} />
          <Route path="/map" element={<Map />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;

