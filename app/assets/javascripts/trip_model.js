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

function PingModel(coordinates){
  this.lat = coordinates.lat
  this.lng = coordinates.lng
}

newPing = function(location, map){
  return new google.maps.Marker({
    position: location,
    map: map
  });
}
