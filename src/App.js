import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';

class App extends Component {
  state = {
    favoriteCities: [
      {name: 'Fortaleza'},
      {name: 'Campinas'},
      {name: 'Sozopol'}
    ]
  }

  render() {
    return (
      <div className="App">
        <ControlPanel locations={this.state.favoriteCities}/>
        <MapContainer />
      </div>
    );
  }
}

export default App;
