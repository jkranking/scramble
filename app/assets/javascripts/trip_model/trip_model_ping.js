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
