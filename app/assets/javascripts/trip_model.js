function TripModel(map){
  this.map = map
  this.center_lat = map.getCenter().lat()
  this.center_lng = map.getCenter().lng()
  this.zoom = map.getZoom()
  this.pings = []
}

function PingModel(coordinates){
  this.lat = coordinates.lat()
  this.lng = coordinates.lng()
}
