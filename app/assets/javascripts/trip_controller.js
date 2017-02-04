function TripController(view, model){
  this.view = view,
  this.model = model
}

TripController.prototype.addPolyline = function(){
  var polyPings = []

  if (this.model.polyline) {  this.model.polyline.setMap(null) }
    //add mouseUp listener
  this.model.pings.forEach(function(ping){
    polyPings.push({lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())})
  })

  this.model.polyline = new google.maps.Polyline({
    path: polyPings,
    geodesic: true,
    strokeColor: 'blue',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  this.model.polyline.setMap(this.model.map)
}


TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // pingListener is global
  var pings = this.model.pings
  var that = this

  pingListener = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var ping = newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    pings.push(ping)
    that.addPolyline()
  })
  this.view.showSubmit()
}

TripController.prototype.submitHandler = function(event) {
  event.preventDefault()
  console.log(this.model.pings)
  console.log(this.model.pings[1].getPosition().lat())
  this.model.updateCenter()
  var name = $('#trip_name').val()

  $.post({
    url: "/trips",
    data: {trip: {latitude: this.model.center_lat,
                  longitude: this.model.center_lng,
                  zoom: this.model.zoom,
                  name: name},
            pings: this.model.pings,
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(response){
    alert('trip saved!')
  }).fail(function(){
    alert('must have at least two pings to save!')
  })

  google.maps.event.removeListener(pingListener);
  this.view.showAdd()
}

