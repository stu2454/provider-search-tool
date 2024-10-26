import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a custom icon configuration for all markers
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecenterMap = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(userLocation, 12);
  }, [userLocation]);
  return null;
};

const MapComponent = ({ providers, userLocation }) => {
  return (
    <MapContainer center={userLocation} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RecenterMap userLocation={userLocation} />

      {/* Marker for User's Location */}
      <Marker position={userLocation} icon={defaultIcon}>
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


