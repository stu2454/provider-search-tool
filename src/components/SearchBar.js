import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState('');

  const handleSearch = () => {
    onSearch(query, address);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type of Assistive Technology (e.g., wheelchair)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;

