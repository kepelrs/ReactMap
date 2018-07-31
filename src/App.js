import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';
import * as mapsAPI from './googleMapsAPI'
import * as newsAPI from './newsAPI'

class App extends Component {
  state = {
    startingCities: [
      'Fortaleza',
      'Campinas',
      'Sozopol'
    ],
    cityInfoObjects: []
  }

  componentDidMount(){
    const cityInfoObjects = [];
    const promises = this.state.startingCities.map(cityName=>{
      return mapsAPI.fetchGeocoding(cityName)
      .then(cityObject=>newsAPI.fetchNews(cityObject))
      .then(cityObject=>cityInfoObjects.push(cityObject))
    })

    Promise.all(promises).then(()=>{
      this.setState({cityInfoObjects})
      const markers = cityInfoObjects.map(city=>{
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
        <ControlPanel locations={this.state.cityInfoObjects}/>
        <MapContainer />
      </div>
    );
  }
}

export default App;
