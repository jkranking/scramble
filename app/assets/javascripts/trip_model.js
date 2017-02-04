function TripModel(map){
  this.map = map
  this.center_lat = map.getCenter().lat()
  this.center_lng = map.getCenter().lng()
  this.zoom = map.getZoom()
  this.pings = []
}

TripModel.prototype.updateCenter = function(){
  this.center_lat = this.map.getCenter().lat()
  this.center_lng = this.map.getCenter().lng()
  this.zoom = this.map.getZoom()
}

TripModel.prototype.loadPingsList = function(){
  window.pings.forEach(function(ping){
    this.pings.push(new PingModel(ping))
  }.bind(this))
}

function PingModel(coordinates){
  this.lat = coordinates.lat
  this.lng = coordinates.lng
}


newPing = function(location, map){
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
    draggable: true // this lets you drag the pings but doesn't redraw polyline
  });
}
