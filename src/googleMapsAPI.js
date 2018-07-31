export const fetchGeocoding = (queryString) => {
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=AIzaSyDCr3LVMPH6XG5mopjT0DHmL8uTLQ-2OrI`)
  .then(response=>response.json())
  .then(MapsAPIResponse=>{
    const cityObject = {}

    if(MapsAPIResponse && MapsAPIResponse.status === "OK") {
      const bestMatch = MapsAPIResponse.results[0]
      const cityName = bestMatch.address_components[0].long_name
      const countryName = bestMatch.address_components[1].long_name
      const location = bestMatch.geometry.location

      cityObject.name = queryString
      cityObject.fullName = cityName + ", " + countryName
      cityObject.coordinates = location
    }

    return cityObject
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

export const populateInfoWindow = (cityObject) => {
  const google = window.google;
  const map = window.map;
  const marker = cityObject.marker;
  let contentString = ''

  for (let i=0; i < cityObject.news.length; i++) {
    contentString += '<div class="asd">' + cityObject.news[i].url + '</div>'
  }

  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
