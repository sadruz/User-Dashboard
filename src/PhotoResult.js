import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PhotoResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const photoUrl = location.state?.photoUrl;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800">Captured Photo</h2>
        {photoUrl ? (
          <img 
            src={photoUrl} 
            alt="Captured" 
            className="w-full h-auto mt-6 rounded-lg shadow-lg" 
          />
        ) : (
          <p className="mt-6 text-red-500">No photo was captured.</p>
        )}
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 mt-8 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PhotoResult;