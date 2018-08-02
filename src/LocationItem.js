import React from 'react';

function LocationItem(props) {
  return (
    <div>
      {!props.city.loadFailed && (
        <button onClick={()=>props.displayInfo(props.city)} className="location-item reset-button-styles light-bottom-border">
          {props.city.name}
          <div className="location-address">{props.city.fullAddress}</div>
        </button>
      )}
      {props.city.loadFailed && (
        <button className="location-item reset-button-styles light-bottom-border">
          {props.city.name}
          <div className="location-address warning">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            Failed to load data. Please, try refreshing the page.
          </div>
        </button>
      )}
    </div>
  )
}

export default LocationItem;