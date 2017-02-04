function TripController(view, model){
  this.view = view,
  this.model = model
}

TripController.prototype.addPolyline = function(){
  var polyPings = []
  this.model.pings.forEach(function(ping){
    polyPings.push({lat: Number(ping.lat), lng: Number(ping.lng)})
  })

  var polyline = new google.maps.Polyline({
    path: polyPings,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  polyline.setMap(this.model.map)
}


TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // pingListener is global
  var pings = this.model.pings
  var that = this

  pingListener = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    pings.push(new PingModel({lat: coordinates.lat(), lng: coordinates.lng()}))
    that.addPolyline()
  })
  this.view.showSubmit()
}

TripController.prototype.submitHandler = function(event) {
  event.preventDefault()

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
    alert('cannot save trip without pings!')
  })

  google.maps.event.removeListener(pingListener);
  this.view.showAdd()
}

