import React, { Component } from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import MapContainer from './MapContainer';

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
      return this.fetchGeocoding(point).then(result=>favoriteCities.push(result))
    })
    Promise.all(promises).then(()=>this.setState({favoriteCities}))
  }

  fetchGeocoding = (queryString)=>{
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=AIzaSyDCr3LVMPH6XG5mopjT0DHmL8uTLQ-2OrI`)
    .then(response=>response.json())
    .then(MapsAPIResponse=>{
      if(MapsAPIResponse && MapsAPIResponse.status === "OK") {
        const firstMatch = MapsAPIResponse.results[0]
        return {
          name: queryString,
          fullName: firstMatch.formatted_address,
          coordinates: firstMatch.geometry.location,
        }
      } else {
        return {}
      }
    })
    .catch(()=>({}))
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
