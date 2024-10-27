import React from 'react';

const ProviderList = ({ providers }) => {
  return (
    <div>
      {providers.length === 0 ? (
        <p style={{ color: "#ff0000", fontSize: "18px", textAlign: "center" }}>
          No providers found for your search criteria. Please try a different type of assistive technology or location.
        </p>
      ) : (
        providers.map((provider) => (
          <div key={provider.Provider_ID} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <h3>{provider.Provider_Name}</h3>
            <p>{provider.Address}</p>
            <p>Services: {provider.AT_Types.join(", ")}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderList;
