import React from 'react';
import * as mapsAPI from './googleMapsAPI'
import LocationItem from './LocationItem';

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
      <div className="filter-locations light-bottom-border">
        <input
          aria-label="Filter city list"
          role="search"
          className='search-contacts'
          type='text'
          placeholder='&#xF002; Search'
          onChange={(event) => this.props.filterCities(event.target.value)}
        />
      </div>

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