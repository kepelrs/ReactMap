import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';
import * as mapsAPI from './googleMapsAPI'

class App extends Component {
  state = {
    startingPoints: [
      'Fortaleza',
      'Campinas',
      'Sozopol'
    ],
    favoriteCities: []
  }

  componentDidMount(){
    const favoriteCities = [];
    const promises = this.state.startingPoints.map(point=>{
      return mapsAPI.fetchGeocoding(point).then(result=>favoriteCities.push(result))
    })
    Promise.all(promises).then(()=>{
      this.setState({favoriteCities})
      const markers = favoriteCities.map(city=>{
        return mapsAPI.createMarker({
          position: city.coordinates,
          title: city.name
        })
      })
      mapsAPI.fitMarkersOnScreen(markers)
    })
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
