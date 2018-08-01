const APIKey = 'AIzaSyDCr3LVMPH6XG5mopjT0DHmL8uTLQ-2OrI'
let google, map, infoWindow;
setGlobals()

function setGlobals() {
  if (google && map) {
    infoWindow = new google.maps.InfoWindow();
    return;
  }
  google = window.google;
  map = window.map;
  setTimeout(setGlobals, 200);
}

export const getGeocodeInfo = (queryString) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${APIKey}`)
  .then(response=>response.json())
  .then(MapsAPIResponse=>{
    const locationInfo = {}

    if(MapsAPIResponse && MapsAPIResponse.status === "OK") {
      const bestMatch = MapsAPIResponse.results[0]
      const cityName = bestMatch.address_components[0].long_name
      const regionName = bestMatch.address_components[2].long_name
      const location = bestMatch.geometry.location

      locationInfo.name = queryString
      locationInfo.cityAndRegion = cityName + ", " + regionName
      locationInfo.fullAddress = bestMatch.formatted_address
      locationInfo.coordinates = location
    }

    return locationInfo
  })
  .catch(()=>({}))
}

export const createMarker = (configOptions) => {
  if (configOptions){
    configOptions.map = map;
    configOptions.animation = google.maps.Animation.DROP
  }

  return new google.maps.Marker(configOptions || {});
}

export const fitMarkersOnScreen = (markersArray) => {
  const markers = markersArray;
  const bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }

  map.fitBounds(bounds);
}

export const bindInfoWindow = (targetMarker, content, allMarkers=[]) => {
  // add event listener to targetMarker
  targetMarker.addListener('click', function() {
    // stop all marker animations
    for(const marker of allMarkers){
      marker !== targetMarker && marker.setAnimation(null)
    }

    // animate only the target marker
    targetMarker.setAnimation(google.maps.Animation.BOUNCE)

    // open marker's info window
    infoWindow.setContent(content)
    infoWindow.open(map, targetMarker);
  });
}

export const triggerMarkerEvent = (targetMarker, event) => {
  new google.maps.event.trigger( targetMarker, event );
}
