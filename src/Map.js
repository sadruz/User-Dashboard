import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';


const cityCoordinates = {
  'Edinburgh': [55.9533, -3.1883],
  'Tokyo': [35.6895, 139.6917],
  'San Francisco': [37.7749, -122.4194],
  'New York': [40.7128, -74.0060],
  'London': [51.5074, -0.1278],
  'Singapore': [1.3521, 103.8198],
  'Sydney': [-33.8688, 151.2093],
};

// Fix for default marker icons not appearing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// A helper component to dynamically set the map's view
const MapViewUpdater = ({ bounds, center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    // A small delay to ensure the map has time to initialize
    setTimeout(() => {
        if (bounds && bounds.isValid()) {
            map.fitBounds(bounds);
        } else if (center) {
            map.setView(center, zoom);
        }
    }, 100);
  }, [bounds, center, zoom, map]);

  return null;
};


function Map() {
  const location = useLocation();
  
  const isSingleEmployeeView = !!location.state?.employee;
  const employeesToShow = isSingleEmployeeView 
    ? [location.state.employee] 
    : location.state?.employees || [];

  const uniqueCities = [...new Set(employeesToShow.map(emp => emp.city))];

  const markerPositions = uniqueCities
    .map(city => cityCoordinates[city])
    .filter(coords => coords);

  const bounds = markerPositions.length > 0 ? L.latLngBounds(markerPositions) : null;
  
  const mapProps = isSingleEmployeeView && markerPositions.length > 0
    ? { center: markerPositions[0], zoom: 13 }
    : { bounds: bounds };

  const title = isSingleEmployeeView
    ? `Location for ${location.state.employee.name}`
    : 'All Employee Locations';

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-inner">
          <MapContainer 
            center={[20.5937, 78.9629]} // A default center
            zoom={4}
            scrollWheelZoom={false}
            touchZoom={false}
            doubleClickZoom={false}
            className="h-full w-full" // The className ensures it takes up the container space
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapViewUpdater {...mapProps} />

            {markerPositions.map((coords, index) => (
              <Marker key={index} position={coords}>
                <Popup>{uniqueCities[index]}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold text-gray-700">Cities Shown on Map:</h3>
          <ul className="mt-2 list-disc list-inside text-gray-600">
            {uniqueCities.length > 0 ? uniqueCities.map((city, index) => (
              <li key={index}>{city}</li>
            )) : <li>No cities found.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Map;