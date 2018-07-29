import React from 'react';

class ControlPanel extends React.Component {
  state = {
    query: '',
    panelOpen: true
  }

  render (){
    return (
    <div className="control-panel">
      <div className="filter-locations">Im the input</div>
      <div className="toggle-locations-list">Im the open menu toggle</div>
      <div className="locations-list open">Im the locations</div>
    </div>
    );
  }
}

export default ControlPanel;