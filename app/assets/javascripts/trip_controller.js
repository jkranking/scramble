function initMap(){
  $(document).ready(function() {
    var myLatlng = {lat: 35.6550645689539, lng: -122.958984375
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatlng
    });

    var trip = new TripController(
      new TripView,
      new TripModel(map)
    )

    var addPing = $('#add-ping').click(trip.pingHandler.bind(trip))

    $('#submit-pings').click(function handler(event) {
      event.preventDefault()

      $.post({
        url: "/trips",
        data: {trip: {latitude: trip.model.center_lat,
                      longitude: trip.model.center_lng,
                      zoom: trip.model.zoom,
                      user_id: 1}}
      }).success(function(response){
        alert(response)
      })
      google.maps.event.removeListener(latLng);
      $('#submit-pings').hide()
      $('#add-ping').show()
    })


  });
}

