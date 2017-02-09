function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

$(document).ready(function(){
  if (!(window.sort_by)) {return}

  var sort = '/trips/recent'
  if (sort_by === 'rating') {
    sort = '/trips/rating'
  } else if (sort_by === 'newest'){
    sort = '/trips/recent'
  } else if (sort_by === 'none') {
    sort = '/trips/standard_sort'
  }


  // $.ajax({url: 'trips/reset'})

  getTrips()
  var $window = $(window)

  $window.scroll(function() {
    if (($(document).height() - $window.height()) === $window.scrollTop()) {
      $()
      setTimeout(getTrips, 2000)

      var rand = getRandom(0, 69)
      var pic;
      if (rand === 69) {
        pic = 'goat-see'
      } else {
        pic = 'spinner-mobile'
      }

      if ($('#loading').length === 0 && $('.trips-end').length === 0){
        $('div.index-list').append('<img id="loading" class="img-responsive" src="/assets/' + pic + '.gif">')
      }
    }
  })

  function getTrips() {
    $.ajax({
      type: 'GET',
      url: sort
    }).done(function(data){
      $('#loading').remove()
      if (!(data)) {
        if ($('.trips-end').length > 0){return;}
        $('div.index-list').parent().append('<div class="trips-end">You Have Reached The End Of The Trips')
        return;
      }
      data.forEach(function(trip){
        var html = formatTrip(trip)
        $('div.index-list').append(html)
      })
    })
  }
})

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
