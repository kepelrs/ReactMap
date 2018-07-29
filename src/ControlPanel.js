import React from 'react';

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
      <div className={"locations-list" + (this.state.mobileDisplayingList ? " open" : "")}>Im the locations</div>
    </div>
    );
  }
}

export default ControlPanel;