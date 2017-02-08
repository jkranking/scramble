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
  }).success(function(data){
    data.forEach(function(trip){
    var html = formatTrip(trip)
    $('div.index-list').append(html)
    })
  })
}

function formatTrip(trip) {
  return '<%= link_to trip_path(trip), class: 'trip-link' do %>' +
      '<div class="map-pic col-md-4">' +
        '<img class="img-responsive" src="https://maps.googleapis.com/maps/api/staticmap?center=<%= trip.latitude %>,<%= trip.longitude%>&zoom=<%= trip.zoom %>&size=600x300&maptype=terrain&path=geodesic:true|<%=static_path(trip)%>&key=<%=ENV[\'STATIC_MAPS_KEY\']%>">' +
        '<div id="trip-list-text">' +
          '<h4><%= trip.name %></h4>' +
          '<ul class="style-ul">' +
            '<li>Submitted by: <%= trip.user.try(:username) %></li>' +
            '<li>Distance: <%= trip.distance %></li>' +
            '<li class="star-ratings-sprite"><span style="width:<%=trip.get_average_rating%>%" class="star-ratings-sprite-rating"></span></li>' +
          '</ul>' +
        '</div>' +
      '</div>'
}
