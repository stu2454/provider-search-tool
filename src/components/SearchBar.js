import React, { useState } from 'react';
import categoriesData from '../data/categories.json';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [customAT, setCustomAT] = useState('');
  const [address, setAddress] = useState({
    street: '',
    suburb: '',
    state: '',
    postcode: '',
  });

  const atOptions = [...new Set(categoriesData.categories), "Other"];
  const states = [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia"
  ];

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const selectedQuery = query === "Other" ? customAT : query;
    const fullAddress = `${address.street}, ${address.suburb}, ${address.state} ${address.postcode}`;
    onSearch(selectedQuery, fullAddress);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <label>
        Type of Assistive Technology:
        <select
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        >
          {atOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </label>

      {query === "Other" && (
        <label>
          Please specify:
          <input
            type="text"
            value={customAT}
            onChange={(e) => setCustomAT(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          />
        </label>
      )}
      
      <label>
        Street Address:
        <input
          type="text"
          name="street"
          value={address.street}
          onChange={handleAddressChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
      </label>
      
      <label>
        Suburb:
        <input
          type="text"
          name="suburb"
          value={address.suburb}
          onChange={handleAddressChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
      </label>
      
      <label>
        State:
        <select
          name="state"
          value={address.state}
          onChange={handleAddressChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        >
          <option value="" disabled>Select a state</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </label>
      
      <label>
        Postcode:
        <input
          type="text"
          name="postcode"
          value={address.postcode}
          onChange={handleAddressChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
      </label>
      
      <button
         onClick={handleSearch}
         style={{
          width: "100%",
          padding: "15px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#ffffff", // White background
          color: "#000000", // Black text
          border: "2px solid #000000", // Optional black border for definition
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "10px",
          textTransform: "uppercase",
       }}
>
  Search
</button>

    </div>
  );
};

export default SearchBar;
