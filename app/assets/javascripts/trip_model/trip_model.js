function TripModel(map){
  this.map = map
  this.center_lat = null
  this.center_lng = null
  this.zoom = null
  this.polyline = null
  this.pings = []
  this.markers = []
}

TripModel.prototype.updateCenter = function(){
  this.center_lat = this.map.getCenter().lat()
  this.center_lng = this.map.getCenter().lng()
  this.zoom = this.map.getZoom()
}





