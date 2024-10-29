import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import ProviderList from './components/ProviderList';
import MapComponent from './components/MapComponent';
import providersData from './data/providers_with_categories.json';

const App = () => {
  const [providers, setProviders] = useState([]);
  const [userLocation, setUserLocation] = useState([-25.2744, 133.7751]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [userPostcode, setUserPostcode] = useState('');

  const handleSearch = async (query, address) => {
    setIsFirstLoad(false);
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: address,
          key: '62317dcdf7a0432f89463e5fbe18a839',
        },
      });

      console.log("API Response:", response.data);

      if (response.data.results.length === 0) {
        alert("Unable to find location. Showing default view.");
        setUserLocation([-25.2744, 133.7751]);
        return;
      }

      const { lat, lng } = response.data.results[0].geometry;
      setUserLocation([lat, lng]);

      const components = response.data.results[0].components;
      const postcode = (components.postcode || '').toString().trim();
      console.log("Extracted Postcode:", postcode);
      setUserPostcode(postcode);

      if (!postcode) {
        alert("Postcode not found in the address. Please check the address.");
        return;
      }

      const filteredProviders = Array.isArray(providersData)
        ? providersData.filter((provider) => {
            const matchesQuery = query
              ? provider.AT_Types.some((category) => category.toLowerCase().includes(query.toLowerCase()))
              : true;

            const providerPostcode = (provider.Postcode || '').toString().trim();
            const matchesPostcode = providerPostcode === postcode;

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
    <div className="full-width-container">
      <div className="app-container">
        <h1 className="app-title">Assistive Technology Provider Finder</h1>
        
        {/* Top section with search fields and map */}
        <div className="top-section">
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="map-container">
            <MapComponent providers={providers} userLocation={userLocation} isFirstLoad={isFirstLoad} />
          </div>
        </div>
        
        {/* Bottom section with search feedback/results */}
        <div className="provider-details-container">
          <ProviderList providers={providers} />
        </div>
      </div>
    </div>
  );
};

export default App;
