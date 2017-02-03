function TripController(view, model){
  this.view = view,
  this.model = model
}

TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // latLng is global
  var pings = this.model.pings
  latLng = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this)
    pings.push(new PingModel({lat: coordinates.lat(), lng: coordinates.lng()}))
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
    alert('')
  })

  google.maps.event.removeListener(latLng);
  this.view.showAdd()
}

