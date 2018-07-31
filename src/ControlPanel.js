import React from 'react';

class ControlPanel extends React.Component {
  state = {
    mobileDisplayingList: false
  }

  toggleDisplayList = () => {
    this.setState(state=>({mobileDisplayingList: !state.mobileDisplayingList}))
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
      <div className="toggle-locations-list" onClick={this.toggleDisplayList}>Im the open menu toggle</div>
      <div className={"locations-list" + (this.state.mobileDisplayingList ? " open" : "")}>
        {cities && cities.map((city, index)=>(
          <div key={index}>{city.name}</div>
        ))}
      </div>
    </div>
    );
  }
}

export default ControlPanel;