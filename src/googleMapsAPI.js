export const fetchGeocoding = (queryString) => {
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

export const createMarker = (configOptions) => {
  const google = window.google;
  const map = window.map;

  if (configOptions){
    configOptions.map = map;
    configOptions.animation = google.maps.Animation.BOUNCE
  }

  return new google.maps.Marker(configOptions || {});
}

export const fitMarkersOnScreen = (markersArray) => {
  const google = window.google;
  const map = window.map;

  var markers = markersArray;
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }

  map.fitBounds(bounds);
}