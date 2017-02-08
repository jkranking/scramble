$(document).ready(function(){
  $.ajax({url: 'trips/reset'})
  getTrips()
  var $window = $(window)
  $window.scroll(function() {
    if (($(document).height() - $window.height()) === $window.scrollTop()) {
      getTrips()
    }
  })
})

function getTrips() {
  $.ajax({
    type: 'GET',
    url: '/trips/recent'
  }).done(function(data){
    if (!(data)) {return;}
    data.forEach(function(trip){
      var html = formatTrip(trip)
      $('div.index-list').append(html)
    })
  })
}

function formatTrip(trip) {
  var username = ''
  if (!(trip.distance)) { trip.distance = '' }
  if(trip.user){ username = trip.user.username}

  return '<a class="trip-link" href="/trips/' + trip.id + '">' +
      '<div class="map-pic col-md-4">' +
        '<img class="img-responsive" src="https://maps.googleapis.com/maps/api/staticmap?center=' +  trip.latitude + ' ,' + trip.longitude + '&zoom=' + trip.zoom + '&size=600x300&maptype=terrain&path=geodesic:true|' + trip.static_path + '&key=' + trip.static_key + '">' +
        '<div id="trip-list-text">' +
          '<h4>' + trip.name + '</h4>' +
          '<ul class="style-ul">' +
            '<li>Submitted by: ' + username + '</li>' +
            '<li>Distance: ' + trip.distance + '</li>' +
            '<li class="star-ratings-sprite"><span style="width:' + trip.get_average_rating + '%" class="star-ratings-sprite-rating"></span></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '</a>'
}
