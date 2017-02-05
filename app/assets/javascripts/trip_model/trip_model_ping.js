TripModel.prototype.simplePings = function(){
  return this.pings.map(function(ping){
    var coordinates = ping.getPosition()
    return new PingModel({lat: coordinates.lat(), lng: coordinates.lng()})
  })
}

TripModel.prototype.loadPingsList = function(){
  window.pings.forEach(function(ping){
    this.pings.push(newPing({lat: Number(ping.lat), lng: Number(ping.lng)}, this.map, false))
  }.bind(this))
}


function PingModel(coordinates){
  this.lat = coordinates.lat
  this.lng = coordinates.lng
}

newPing = function(location, map, draggable){
  var circle ={
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'blue',
    fillOpacity: .4,
    scale: 3.5,
    strokeColor: 'white',
    strokeWeight: 1
  };

  return new google.maps.Marker({
    position: location,
    map: map,
    icon: circle,
    draggable: draggable // this lets you drag the pings but doesn't redraw polyline
  });
}

TripModel.prototype.calculateDistance = function(){
    var pingCoordinates = this.pings.map(function(ping){
      return {lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())}
    })
    // console.log(pingCoordinates)
    var pingDistance = []
    for (i = 0; i < pingCoordinates.length - 1; i++){
      var a = new google.maps.LatLng(pingCoordinates[i].lat, pingCoordinates[i].lng)
      var b = new google.maps.LatLng(pingCoordinates[i+1].lat, pingCoordinates[i+1].lng)
      pingDistance.push(google.maps.geometry.spherical.computeDistanceBetween(a,b))
    }

    var totalDistance = pingDistance.reduce(function(a,b){
      return a + b
    })
    console.log(totalDistance * 0.000621371192)
}




// var a = new google.maps.LatLng(46.49082901981415,-118.30078125);
// var b = new google.maps.LatLng(47.60523713135211,-122.32177734375);
// var distance = google.maps.geometry.spherical.computeDistanceBetween(a,b);







