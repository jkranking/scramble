var loadPings = function(id, map){
  $.get({
    url: "/get_pings",
    data: {id: id}
  }).done(function(response){
    response.forEach(function(ping){
      newPing({lat: Number(ping.lat), lng: Number(ping.long)}, map)
    })
  })
}

var setMap = function() {

  var zoom = Number(trip.zoom)
  var coordinates = {lat: Number(trip.latitude), lng: Number(trip.longitude)};

  return new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: coordinates
  });
}
