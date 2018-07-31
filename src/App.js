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
      this.setState({
        allCityObjects : allCityObjects,
        nowShowing: allCityObjects
      })
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

  render() {
    return (
      <div className="App">
        <ControlPanel cities={this.state.nowShowing} filterCities={this.filterCities}/>
        <MapContainer cityObjects={this.state.nowShowing} />
      </div>
    );
  }
}

export default App;
