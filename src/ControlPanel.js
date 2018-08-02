import React from 'react';
import * as mapsAPI from './googleMapsAPI'
import LocationItem from './LocationItem';
import SearchBox from './SearchBox';

class ControlPanel extends React.Component {
  state = {
    mobileMenuOpen: false
  }

  toggleMenu = () => {
    this.setState(state=>({mobileMenuOpen: !state.mobileMenuOpen}))
  }

  openInfoWindow = (city) => {
    const marker = city.marker
    mapsAPI.triggerMarkerEvent(marker, 'click');
    // close menu (for mobile only)
    this.setState({mobileMenuOpen: false})
  }

  render (){
    let displayedCities = this.props.cities;

    return (
    <div className="control-panel">
      <h1>MyCities</h1>
      <SearchBox filterCities={this.props.filterCities} />

      <div className="toggle-locations-list" onClick={this.toggleMenu}>
        <button className="reset-button-styles">
          <i className={"menu-toggler fa fa-caret-" + (this.state.mobileMenuOpen ? 'up' : 'down')} aria-hidden="true"></i>
        </button>
      </div>

      <ul className={"locations-list" + (this.state.mobileMenuOpen ? " open" : "")}>
        {displayedCities && displayedCities.map((targetCity, index)=>(
          <li key={index}>
            <LocationItem city={targetCity} displayInfo={this.openInfoWindow}/>
          </li>
        ))}
      </ul>

    </div>
    );
  }
}

export default ControlPanel;