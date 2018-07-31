import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import escapeRegExp from 'escape-string-regexp'
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
    nowShowing:[]
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

      this.setState({
        allCityObjects : allCityObjects,
        nowShowing: allCityObjects
      })

      mapsAPI.fitMarkersOnScreen(markers)
    })
  }

  filterCities = (filterString) => {
    let nowShowing;
    if (filterString) {
      const match = new RegExp(escapeRegExp(filterString), 'i')
      nowShowing = this.state.allCityObjects.filter((cityObj) => match.test(cityObj.name))
    } else {
      nowShowing = this.state.allCityObjects
    }
    this.setState({nowShowing})
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
        <ControlPanel cities={this.state.nowShowing} filterCities={this.filterCities}/>
        <MapContainer markers={this.state.nowShowing} />
      </div>
    );
  }
}

export default App;
