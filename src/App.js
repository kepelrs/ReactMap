import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ControlPanel />
        <MapContainer />
      </div>
    );
  }
}

export default App;
