import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ProviderList from './components/ProviderList';
import MapComponent from './components/MapComponent';
import providersData from './data/providers_with_categories.json';

const App = () => {
  const [providers, setProviders] = useState(providersData || []);
  const [userLocation, setUserLocation] = useState([-25.2744, 133.7751]); // Default to central Australia

  const handleSearch = async (query, address) => {
    try {
      // OpenCage Geocoding API request
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: '62317dcdf7a0432f89463e5fbe18a839', // Replace with your OpenCage API key
        },
      });

      if (response.data.results.length === 0) {
        console.error("No results found for this address.");
        alert("Unable to find location. Showing default view.");
        setUserLocation([-25.2744, 133.7751]); // Default to central Australia
        return;
      }

      // Set user location to the returned coordinates
      const { lat, lng } = response.data.results[0].geometry;
      setUserLocation([lat, lng]);

      // Filter providers based on the query (AT type)
      const filteredProviders = Array.isArray(providersData)
        ? providersData.filter((provider) => {
            const matchesQuery = query
              ? provider.AT_Types.some((category) => category.toLowerCase().includes(query.toLowerCase()))
              : true;
            return matchesQuery;
          })
        : [];

      setProviders(filteredProviders);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      alert("Error fetching location. Showing default view.");
      setUserLocation([-25.2744, 133.7751]); // Default to central Australia
    }
  };

  return (
    <div>
      <h1>Provider Search Tool</h1>
      <SearchBar onSearch={handleSearch} />
      <ProviderList providers={providers} />
      <MapComponent providers={providers} userLocation={userLocation} />
    </div>
  );
};

export default App;

