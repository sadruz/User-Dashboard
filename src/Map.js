import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet to fix a known icon issue with React-Leaflet

// In a real application, these coordinates would come from a geocoding API or your database.
// Note: Leaflet uses [latitude, longitude] format for coordinates.
const cityCoordinates = {
  'Edinburgh': [55.9533, -3.1883],
  'Tokyo': [35.6895, 139.6917],
  'San Francisco': [37.7749, -122.4194],
  'New York': [40.7128, -74.0060],
  'London': [51.5074, -0.1278],
  'Singapore': [1.3521, 103.8198],
  'Sydney': [-33.8688, 151.2093],
};

// Fix for a common issue where default marker icons don't appear
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


function Map() {
  const navigate = useNavigate();
  const location = useLocation();
  const employees = location.state?.employees || [];
  
  const uniqueCities = [...new Set(employees.map(emp => emp.city))];

  // Create a list of coordinate points for the map to bound to
  const markerPositions = uniqueCities
    .map(city => cityCoordinates[city])
    .filter(coords => coords); // Filter out any cities without coordinates

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 text-center">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Employee Locations</h2>
        
        <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-inner">
          {markerPositions.length > 0 ? (
            <MapContainer 
              bounds={markerPositions} // Automatically zooms to fit all markers
              scrollWheelZoom={false} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {uniqueCities.map((city, index) => {
                const coords = cityCoordinates[city];
                if (!coords) return null;
                return (
                  <Marker key={index} position={coords}>
                    <Popup>{city}</Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <p className="text-gray-500">No location data available to display on the map.</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-left">
          <h3 className="text-xl font-semibold text-gray-700">Cities with Employees:</h3>
          <ul className="mt-2 list-disc list-inside text-gray-600">
            {uniqueCities.length > 0 ? uniqueCities.map((city, index) => (
              <li key={index}>{city}</li>
            )) : <li>No cities found.</li>}
          </ul>
        </div>
      </div>
      
      <button 
        onClick={() => navigate(-1)} 
        className="px-6 py-2 mt-8 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 transition-colors duration-300"
      >
        Go Back
      </button>
    </div>
  );
}

export default Map;
