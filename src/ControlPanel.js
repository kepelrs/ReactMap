import React from 'react';
import escapeRegExp from 'escape-string-regexp'

class ControlPanel extends React.Component {
  state = {
    query: '',
    mobileDisplayingList: false
  }

  toggleDisplayList = () => {
    this.setState(state=>({mobileDisplayingList: !state.mobileDisplayingList}))
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  render (){
    let locations;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      locations = this.props.locations.filter((location) => match.test(location.name))
    } else {
      locations = this.props.locations
    }

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
        {locations && locations.map((location, index)=>(
          <div key={index}>{location.name}</div>
        ))}
      </div>
    </div>
    );
  }
}

export default ControlPanel;