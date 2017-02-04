function TripModel(map){
  this.map = map
  this.center_lat = map.getCenter().lat()
  this.center_lng = map.getCenter().lng()
  this.zoom = map.getZoom()
  this.pings = []
  this.markers = []
  this.polyline = null
}

TripModel.prototype.updateCenter = function(){
  this.center_lat = this.map.getCenter().lat()
  this.center_lng = this.map.getCenter().lng()
  this.zoom = this.map.getZoom()
}

TripModel.prototype.simplePings = function(){
  return this.pings.map(function(ping){
    var coordinates = ping.getPosition()
    return new PingModel({lat: coordinates.lat(), lng: coordinates.lng()})
  })
}

TripModel.prototype.loadPingsList = function(){
  window.pings.forEach(function(ping){
    this.pings.push(newPing({lat: Number(ping.lat), lng: Number(ping.lng)}, this.map))
  }.bind(this))
}

TripModel.prototype.loadMarkersList = function(){
  window.markers.forEach(function(marker){
    this.markers.push(newMarker({lat: Number(marker.lat), lng: Number(marker.lng)}, this.map))
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

var labelIndex = 0

newMarker = function(location, map){
  labelIndex++
  return new google.maps.Marker({
    position: location,
    map: map,
    label: labelIndex.toString(),
    draggable: true // this lets you drag the pings but doesn't redraw polyline
  });
}
