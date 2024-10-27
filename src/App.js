import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import ProviderList from './components/ProviderList';
import MapComponent from './components/MapComponent';
import providersData from './data/providers_with_categories.json';

const App = () => {
  const [providers, setProviders] = useState(providersData || []);
  const [userLocation, setUserLocation] = useState([-25.2744, 133.7751]); // Default to central Australia

  const handleSearch = async (query, address) => {
    try {
      console.log("Selected AT Type:", query);
      console.log("Entered Address:", address);

      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: '62317dcdf7a0432f89463e5fbe18a839', // Your OpenCage API key
        },
      });

      if (response.data.results.length === 0) {
        console.error("No results found for this address.");
        alert("Unable to find location. Showing default view.");
        setUserLocation([-25.2744, 133.7751]);
        return;
      }

      const { lat, lng } = response.data.results[0].geometry;
      const postcode = String(response.data.results[0].components.postcode).trim();
      console.log("Retrieved Postcode:", postcode);
      
      setUserLocation([lat, lng]);

      // Debugging: Log provider details before filtering
      console.log("Providers in Data:");
      providersData.forEach(provider => {
        console.log(`Provider: ${provider.Provider_Name}, Postcode: ${provider.Postcode}, AT_Types: ${provider.AT_Types}`);
      });

      // Filter providers by AT type and postcode, unless "Other" is selected
      const filteredProviders = Array.isArray(providersData)
        ? providersData.filter((provider) => {
            const matchesQuery = query === "Other" || query === ""
              ? true // If "Other" is selected, include all providers in the postcode
              : provider.AT_Types.some((category) => 
                  category.toLowerCase().includes(query.toLowerCase()) || 
                  query.toLowerCase().includes(category.toLowerCase())
                );
            const matchesPostcode = String(provider.Postcode).trim() === postcode;
            console.log(`Checking Provider: ${provider.Provider_Name} - Matches Query: ${matchesQuery}, Matches Postcode: ${matchesPostcode}`);
            return matchesQuery && matchesPostcode;
          })
        : [];

      console.log("Filtered Providers:", filteredProviders);
      setProviders(filteredProviders);
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      alert("Error fetching location. Showing default view.");
      setUserLocation([-25.2744, 133.7751]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Assistive Technology Provider Finder</h1>
      <div className="top-section">
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="map-container">
          <MapComponent providers={providers} userLocation={userLocation} />
        </div>
      </div>
      
      <div className="provider-details-container">
        <ProviderList providers={providers} />
      </div>
    </div>
  );
};

export default App;
