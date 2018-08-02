import React from 'react';
import * as mapsAPI from './googleMapsAPI'

class ControlPanel extends React.Component {
  state = {
    mobileDisplayingList: false
  }

  toggleDisplayList = () => {
    this.setState(state=>({mobileDisplayingList: !state.mobileDisplayingList}))
  }

  openInfoWindow = (city) => {
    const marker = city.marker
    mapsAPI.triggerMarkerEvent(marker, 'click');
    // close menu (for mobile only)
    this.setState({mobileDisplayingList: false})
  }

  updateQuery = (query) => {
    this.props.filterCities(query)
  }

  render (){
    let cities = this.props.cities;

    return (
    <div className="control-panel">
      <h1>MyCities</h1>
      <div className="filter-locations">
        <input
          className='search-contacts'
          type='text'
          placeholder='&#xF002; Search'
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
      </div>
      <div className="toggle-locations-list" onClick={this.toggleDisplayList}>
        <i className={"menu-toggler fa fa-caret-" + (this.state.mobileDisplayingList ? 'up' : 'down')} aria-hidden="true"></i>
      </div>
      <ul className={"locations-list" + (this.state.mobileDisplayingList ? " open" : "")}>
        {cities && cities.map((city, index)=>(
          <li key={index} onClick={()=>this.openInfoWindow(city)} className="location-item">
          {city.name}
          <div className="location-address">{city.fullAddress}</div>
          </li>
        ))}
      </ul>
    </div>
    );
  }
}

export default ControlPanel;