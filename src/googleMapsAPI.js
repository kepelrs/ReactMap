const google = window.google;
const map = window.map;

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

export const createMarker = () => {
  return new google.maps.Marker({
    position: {lat : -3.7327144, lng : -38.5269981},
    map: map,
    animation: google.maps.Animation.BOUNCE,
    title: 'Hello World'
  });
}