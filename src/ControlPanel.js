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
      <div className={"locations-list" + (this.state.mobileDisplayingList ? " open" : "")}>
        {cities && cities.map((city, index)=>(
          <div key={index} onClick={()=>this.openInfoWindow(city)}>{city.name}</div>
        ))}
      </div>
    </div>
    );
  }
}

export default ControlPanel;