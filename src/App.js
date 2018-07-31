import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';
import * as mapsAPI from './googleMapsAPI'
import * as newsAPI from './newsAPI'

class App extends Component {
  state = {
    startingCityNames: [
      'Fortaleza',
      'Sofia',
      'Bonn',
      'London',
      'São Paulo',
    ],
    allCityObjects: [],
    displayedCities:[]
  }

  componentDidMount(){
    let allCityObjects = [];
    const promises = this.state.startingCityNames.map(cityName=>{
      return mapsAPI.getGeocodeInfo(cityName)
      .then(cityObject=>newsAPI.fetchNews(cityObject))
      .then(cityObject=>allCityObjects.push(cityObject))
    })

    Promise.all(promises).then(()=>{
      const markers = []

      allCityObjects = allCityObjects.map(cityObj => {
        cityObj.marker = mapsAPI.createMarker({
          position: cityObj.coordinates,
          title: cityObj.name
        })
        markers.push(cityObj.marker)
        this.populateInfoWindow(cityObj)
        return cityObj
      })

      this.setState({allCityObjects})

      mapsAPI.fitMarkersOnScreen(markers)
    })
  }


  populateInfoWindow = (cityObject) => {
    const marker = cityObject.marker;
    let url, title;
    let contentString = ''

    for (let i=0; i < cityObject.news.length; i++) {
      url = cityObject.news[i].url
      title = cityObject.news[i].title
      contentString += `<div class="news"><a href="${url}" target="_blank">${title}</a></div>`
    }

    mapsAPI.bindInfoWindow(marker, contentString)
  }

  render() {
    return (
      <div className="App">
        <ControlPanel locations={this.state.allCityObjects}/>
        <MapContainer />
      </div>
    );
  }
}

export default App;
