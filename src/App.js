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
      'Essen',
      'London',
      'São Paulo',
      'Sozopol'
    ],
    allCityObjects: [],
    nowShowing:[]
  }

  componentDidMount(){
    this.loadCitiesInfo()
  }

  loadCitiesInfo() {
    // create city objects containing news and geolocation data
    let allCities = this.state.startingCityNames;
    let allCityObjects = [];

    // keep track of all generated promises
    const promises = allCities.map(cityName=>{
      return mapsAPI.getGeocodeInfo(cityName)
        .then(cityObject=>newsAPI.fetchNews(cityObject))
        .then(cityObject=>allCityObjects.push(cityObject))
        .catch(()=>allCityObjects.push({name: cityName, loadFailed: true}))
    })

    // update state after all cities have been loaded (all promises finished)
    Promise.all(promises).then(()=>{
      this.setState({
        allCityObjects : allCityObjects,
        nowShowing: allCityObjects
      })
    })
  }

  filterCities = (filterString) => {
    // display only cities that include the filterString on its full address
    let nowShowing;
    if (filterString) {
      const match = new RegExp(escapeRegExp(filterString), 'i')
      nowShowing = this.state.allCityObjects.filter((cityObj) => match.test(cityObj.name) || match.test(cityObj.fullAddress))
    } else {
      nowShowing = this.state.allCityObjects
    }
    this.setState({nowShowing})
  }

  render() {
    const filteredCities = this.state.nowShowing
    const markers = this.state.nowShowing.filter(cityObj=>!cityObj.loadFailed)

    return (
      <div className="App">
        <ControlPanel cities={filteredCities} filterCities={this.filterCities}/>
        <MapContainer cityObjects={markers} />
      </div>
    );
  }
}

export default App;
