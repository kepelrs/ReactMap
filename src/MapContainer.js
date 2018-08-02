import React from 'react';
import * as mapsAPI from './googleMapsAPI'

class MapContainer extends React.Component {
  state = {mapLoadFailed: false}

  /*
    On componentDidUpdate:
    Initialize markers
    Handle map failed to load situations gracefully
  */
  componentDidUpdate() {
    if(!this.state.mapLoadFailed){
      try{
        this.initMarkers()
      }
      catch(e) {
        this.setState({mapLoadFailed: true})
      }
    }
  }

  // Remove all markers before updating
  getSnapshotBeforeUpdate(prevProps, prevState){
    this.removeMarkers(prevProps)
    return null
  }

  removeMarkers = (props) => {
    props.cityObjects.map(cityObj => cityObj.marker.setMap(null))
  }

  initMarkers = () => {
    const markers = [];

    // Create a marker for all cities currently present as props
    for (const cityObj of this.props.cityObjects) {
      let markerOptions = {
        position: cityObj.coordinates,
        title: cityObj.name
      }
      cityObj.marker = mapsAPI.createMarker(markerOptions)

      // Store all markers in the array
      markers.push(cityObj.marker)

      // populate info window with links
      this.setupInfoWindow(cityObj, markers)
    }

    // resize map to fit all markers
    mapsAPI.fitMarkersOnScreen(markers)
  }

  setupInfoWindow = (cityObject, allMarkers) => {
    const targetMarker = cityObject.marker;
    const markersToBeReset = allMarkers
    const cityNews = cityObject.news;
    const cityName = cityObject.name;
    let contentString = '';

    // create infoWindow HTML content
    contentString += `<div class="news-head"><h2>Latest about ${cityName}</h2></div>`
    for (const news of cityNews) {
      contentString += `<div class="news"><a href="${news.url}" target="_blank">${news.title}</a></div>`
    }
    contentString += `<div class="news-footer">Source: <a href="https://newsapi.org" target="_blank">NewsAPI</a></div>`

    // bind display infoWindow to marker clicks
    mapsAPI.bindInfoWindow(targetMarker, contentString, markersToBeReset)
  }

  render() {
    return (
      <div
      id="map"
      className="map-container"
      role="application"
      aria-label="Map displaying city locations"
      tabIndex="0"
      >
        {this.state.mapLoadFailed && (
          <div className="map-fail warning">
            <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
            Map failed to load. Please, try refreshing your browser.
          </div>
        )}
      </div>
    );
  }
}

export default MapContainer;