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





