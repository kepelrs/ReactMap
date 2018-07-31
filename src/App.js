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
      'Sofia',
      'Bonn',
      'London',
      'São Paulo',
    ],
    cityInfoObjects: []
  }

  componentDidMount(){
    let cityInfoObjects = [];
    const promises = this.state.startingCities.map(cityName=>{
      return mapsAPI.fetchGeocoding(cityName)
      .then(cityObject=>newsAPI.fetchNews(cityObject))
      .then(cityObject=>cityInfoObjects.push(cityObject))
    })

    Promise.all(promises).then(()=>{
      const markers = []

      cityInfoObjects = cityInfoObjects.map(cityObj => {
        cityObj.marker = mapsAPI.createMarker({
          position: cityObj.coordinates,
          title: cityObj.name
        })
        markers.push(cityObj.marker)
        mapsAPI.populateInfoWindow(cityObj)
        return cityObj
      })

      this.setState({cityInfoObjects})

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
