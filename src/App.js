import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import List from './List';
import Details from './Details';
import PhotoResult from './PhotoResult';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/photo-result" element={<PhotoResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;