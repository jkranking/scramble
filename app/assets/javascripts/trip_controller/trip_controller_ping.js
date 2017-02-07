TripController.prototype.addPolyline = function(){

  if (this.model.polyline) {  this.model.polyline.setMap(null) }
    //add mouseUp listener
  var polyPings = this.model.pings.map(function(ping){
    return {lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())}
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

TripController.prototype.setElevationGraph = function(){
  if (this.model.pings.length > 1) {
    var polyPings = this.model.pings.map(function(ping){
      return {lat: Number(ping.getPosition().lat()), lng: Number(ping.getPosition().lng())}
    })

    var elevator = new google.maps.ElevationService;
    this.displayPathElevation(polyPings, elevator, map)
  }
}

TripController.prototype.pingHandler = function(event) {
  event.preventDefault()
  // pingListener is global
  var pings = this.model.pings
  var that = this

  pingListener = google.maps.event.addListener(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var ping = newPing({lat: coordinates.lat(), lng: coordinates.lng()}, this, true)
    pings.push(ping)
    ping.addListener('drag', that.addPolyline.bind(that));
    ping.addListener('dragend', that.setElevationGraph.bind(that));
    ping.addListener('dragend', that.model.calculateDistance.bind(that.model))
    that.addPolyline()
    that.setElevationGraph()
    var distance = that.model.calculateDistance()
    that.view.showDistance(distance)

    google.maps.event.addListener(ping, "rightclick", function (point) {
       this.setMap(null);
       var index = that.model.pings.indexOf(this)
       that.model.pings.splice(index, 1)
       that.addPolyline()
       that.setElevationGraph()
       that.model.calculateDistance()
      });

  })
  this.view.showSubmit()
}

TripController.prototype.submitPingsHandler = function(event) {
  event.preventDefault()
  this.model.updateCenter()
  var name = $('#trip_name').val()
  var distance = this.model.calculateDistance().toString()

  $.post({
    url: "/trips",
    data: {trip: {latitude: this.model.center_lat,
                  longitude: this.model.center_lng,
                  zoom: this.model.zoom,
                  name: name,
                  distance: distance},
            pings: this.model.simplePings(),
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(saved_trip){
    alert('trip saved!')
    window.location.href = "/trips/" + saved_trip.id;
  }).fail(function(response){
    alert(response.responseJSON.error_message)
  })

  google.maps.event.removeListener(pingListener);
  this.view.showAdd()
}

TripController.prototype.editTripHandler = function(event) {
  event.preventDefault()
  var that = this
  var name = $('#trip-name').children('h3').html()
  $('#trip-name').html('<textarea class="form-control">' + name + '</textarea>')

  this.model.pings.forEach(function(ping){
    ping.setDraggable(true);
    ping.addListener('drag', that.addPolyline.bind(that));
    ping.addListener('dragend', that.setElevationGraph.bind(that));
    ping.addListener('dragend', that.model.calculateDistance.bind(that.model))
    google.maps.event.addListener(ping, "rightclick", function (point) {
       this.setMap(null);
       var index = that.model.pings.indexOf(this)
       that.model.pings.splice(index, 1)
       that.addPolyline()
       that.setElevationGraph();
       that.model.calculateDistance()
      });
  })

  this.pingHandler(event)
  this.view.showUpdateTrip()
}

TripController.prototype.updateTripHandler = function(event) {
  event.preventDefault()
  this.model.updateCenter()
  var name = $('#trip-name').children('textarea').val()
  var distance = this.model.calculateDistance().toString()

  $.ajax({
    type: 'PUT',
    url: "/trips/" + window.trip.id,
    data: {trip: {latitude: this.model.center_lat,
                  longitude: this.model.center_lng,
                  zoom: this.model.zoom,
                  name: name,
                  distance: distance},
            pings: this.model.simplePings(),
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }).done(function(updated_trip){
    $('#trip-name').html('<h3>' + name + '</h3>')
    alert('trip updated!')
  }).fail(function(){
    alert('something went wrong!')
  })

  this.view.showAddMarkerAndEditTrip()

  google.maps.event.removeListener(pingListener);
  this.model.pings.forEach(function(ping){
    google.maps.event.clearInstanceListeners(ping)
    ping.setDraggable(false);
  }.bind(this))

}
