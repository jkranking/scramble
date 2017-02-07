var initMap = function(){

  var id = window.trip.id
  var pings = window.pings
  var markers = window.markers

  map = setMap(window.trip)
  searchBox(map)

  var trip = new TripController(
    new TripView,
    new TripModel(map)
  )

  if (pings) {
    trip.model.loadPingsList()
    trip.addPolyline()
    trip.setElevationGraph()
    var distance = trip.model.calculateDistance()
    trip.view.showDistance(distance)
  }

  if (markers) {
    trip.model.loadMarkersList()
  }

  trip.view.showAdd()
  trip.view.showAddMarkerAndEditTrip()

  $('#add-ping').click(trip.pingHandler.bind(trip))
  $('#submit-pings').click(trip.submitPingsHandler.bind(trip))

  $('#add-marker').click(trip.markerHandler.bind(trip))
  $('#submit-marker').click(trip.submitMarkerHandler.bind(trip))
  $('#cancel-marker').click(trip.cancelNewMarker.bind(trip))

  $('#edit-trip').click(trip.editTripHandler.bind(trip))
  $('#update-trip').click(trip.updateTripHandler.bind(trip))


  $('#map').on('click', '.edit-marker', trip.editMarker.bind(trip))
  $('#map').on('click', '.update-marker', trip.updateMarker.bind(trip))
  $('#map').on('click', '.delete-marker', trip.deleteMarker.bind(trip))




$(".stars label").click(function(event){
  var form = $(event.target)
  var star = form.attr('for')

  // console.log(id)
  $.post('/ratings', {rating :star, trip_id :id}, function() {
  }) 
})






  // $(".post-container").on('submit', ".inline", function(event){
  //   event.preventDefault()
  //   var $url = $(event.target).attr('action')
  //   var form = $(event.target)
  //   $.post($url, function(response) {
  //     response = JSON.parse(response)
  //     var $article = $("article#" + response.id)
  //     $($article).find('.upvote-button').css('color', 'green')
  //     $($article).find('.points').text(response.votes)
  //   }) 






    // <article id="<%= post.id %>">
    //   <form method="post" action='/posts/<%= post.id %>/vote' class="inline">
    //     <button type="submit" name="submit_param" value="submit_value" class="fa fa-sort-desc vote-button upvote-button"></button>
    //   </form>
    //   <h2><a href='/post/<%= post.id %>'><%= post.title %></a></h2>
    //   <p>
    //     <span class='points'><%= post.points %></span>
    //     <span class='username'><%= post.username %></span>
    //     <span class='timestamp'><%= post.time_since_creation %></span>
    //     <span class='comment-count'><%= post.comment_count %></span>
    //     <a class="delete" href='/posts/<%= post.id %>'></a>
    //   </p>
    //   </article>
























}






