var initMap = function(){
    var lat = Number($('.latitude').attr('id'))
    var lng = Number($('.longitude').attr('id'))
    var zoom = Number($('.zoom').attr('id'))
    var myLatlng = {lat: lat, lng: lng};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: myLatlng
    });

    var mapURL = window.location.href;
    console.log(mapURL)
    var id = mapURL.match(/\d*$/)[0]
    var trip = new TripController(
      new TripView,
      new TripModel(map)
    )

    var addPing = $('#add-ping').click(trip.pingHandler.bind(trip))

    $('#submit-pings').click(function handler(event) {
      event.preventDefault()
      trip.model.updateCenter()

      var name = $('#trip_name').val()

      $.post({
        url: "/trips",
        data: {trip: {latitude: trip.model.center_lat,
                      longitude: trip.model.center_lng,
                      zoom: trip.model.zoom,
                      name: name},
                pings: trip.model.pings,
                AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
      }).done(function(response){
        alert('')
      })

      google.maps.event.removeListener(latLng);
      $('#submit-pings').hide()
      $('#add-ping').show()
    })

    if ( id != "" ) {
      $.get({
        url: "/get_pings",
        data: {id: id}
      }).done(function(response){
        response.forEach(function(ping){
          newMarker({lat: Number(ping.lat), lng: Number(ping.long)}, map)
        })
        console.log(response)
      })
    }
}





