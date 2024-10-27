import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a custom icon for the user's location with a green marker icon URL
const userLocationIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', // Green icon URL
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

// Define the default icon for provider markers
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FitBounds = ({ providers, userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (providers.length === 0) return;

    const locations = [
      [userLocation[0], userLocation[1]],
      ...providers.map(provider => [provider.Latitude, provider.Longitude])
    ];
    
    const bounds = L.latLngBounds(locations);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [providers, userLocation, map]);

  return null;
};

const MapComponent = ({ providers, userLocation }) => {
  return (
    <MapContainer center={userLocation} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <FitBounds providers={providers} userLocation={userLocation} />
      
      {/* Marker for User's Location with Green Icon */}
      <Marker position={userLocation} icon={userLocationIcon}>
        <Popup>
          <strong>Your Location</strong><br />
          {userLocation[0]}, {userLocation[1]}
        </Popup>
      </Marker>

      {/* Markers for Providers */}
      {providers.map((provider) => (
        <Marker key={provider.Provider_ID} position={[provider.Latitude, provider.Longitude]} icon={defaultIcon}>
          <Popup>
            <strong>{provider.Provider_Name}</strong><br />
            {provider.Address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
