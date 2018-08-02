import React from 'react';

function CityItem(props) {
  const city = props.city;
  const showInfoWindow = props.displayInfo;

  return (
    <div>
      {!city.loadFailed && (
        <button onClick={()=>showInfoWindow(city)} className="location-item reset-button-styles light-bottom-border">
          {city.name}
          <div className="location-address">{city.fullAddress}</div>
        </button>
      )}

      {city.loadFailed && (
        <button className="location-item reset-button-styles light-bottom-border">
          {city.name}
          <div className="location-address warning">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            Failed to load data. Please, try refreshing the page.
          </div>
        </button>
      )}
    </div>
  )
}

export default CityItem;