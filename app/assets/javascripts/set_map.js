var setMap = function() {

  var zoom = Number(trip.zoom)
  var coordinates = {lat: Number(trip.latitude), lng: Number(trip.longitude)};

  return new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: coordinates,
    mapTypeId: 'terrain'
  });
}
