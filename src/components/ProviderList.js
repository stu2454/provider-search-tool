import React from 'react';

const ProviderList = ({ providers }) => (
  <div>
    {providers.map((provider) => (
      <div key={provider.Provider_ID}>
        <h3>{provider.Provider_Name}</h3>
        <p>Address: {provider.Address}</p>
        <p>Postcode: {provider.Postcode}</p>
      </div>
    ))}
  </div>
);

export default ProviderList;

