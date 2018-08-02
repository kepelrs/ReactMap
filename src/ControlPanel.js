import React from 'react';
import * as mapsAPI from './googleMapsAPI'
import SearchBox from './SearchBox';
import CityList from './CityList';

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
    const displayedCities = this.props.cities;
    const menuOpen = this.state.mobileMenuOpen;
    const showInfo = this.openInfoWindow;
    const filterFunction = this.props.filterCities;
    const toggleMenu = this.toggleMenu;

    return (
    <div className="control-panel">
      <h1>MyCities</h1>
      <SearchBox filterCities={filterFunction} />
      <div className="toggle-locations-list" onClick={toggleMenu}>
        <button className="reset-button-styles">
          <i className={"menu-toggler fa fa-caret-" + (menuOpen ? 'up' : 'down')} aria-hidden="true"></i>
        </button>
      </div>
      <CityList cities={displayedCities} menuOpen={menuOpen} showInfo={showInfo} />
    </div>
    );
  }
}

export default ControlPanel;