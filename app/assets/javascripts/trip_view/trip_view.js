function TripView(){}

TripView.prototype.showSubmit = function(){
  $('#add-ping').hide()
  $('#submit-pings').show()
}


TripView.prototype.showAdd = function(){
  $('#submit-pings').hide()
  $('#add-ping').show()
}

TripView.prototype.showSubmitMarker = function(){
  $('#add-marker').hide()
  $('#edit-trip').hide()
  $('#delete-trip').hide()
  $('#update-trip').hide()
  $('#upload-photo').show()
  $('#image-form').show()
  $('#submit-marker').show()
  $('#cancel-marker').show()
  $(noteForm()).insertAfter($('#add-marker'))
}

TripView.prototype.showAddMarkerAndEditTrip = function(){
  $('#submit-marker').hide()
  $('#upload-photo').hide()
  $('#cancel-marker').hide()
  $('#note-form').remove()
  $('#update-trip').hide()
  $('#add-marker').show()
  $('#edit-trip').show()
  $('#delete-trip').show()
}

TripView.prototype.showUpdateTrip = function(){
  $('#submit-marker').hide()
  $('#cancel-marker').hide()
  $('#add-marker').hide()
  $('#note-form').remove()
  $('#edit-trip').hide()
  $('#delete-trip').hide()
  $('#update-trip').show()
}

TripView.prototype.showDistance = function(distance){
  $("#distance").text("Distance: " + distance + " mi")
}

function noteForm(){
  return '<div class="form-group" id="note-form">' +
             '<label for="note">Note:</label>' +
             '<textarea class="form-control" rows="5" id="new-note"></textarea>' +
         '</div>'
}

TripView.prototype.showElevationChart = function(chart, data){
  chart.draw(data, {
    height: 150,
    curve_type: 'function',
    backgroundColor: '#B4C1BE',
    colors: ['#40b0c9'],
    legend: 'none',
    titleY: 'Elevation (f)',
  });
}

TripView.prototype.showElevation = function(cumulativeGain, elevations){
  var gain = (cumulativeGain * 3.28084).toFixed(0)
  $("#gain").text("Elevation gain: " + gain + " ft")

  var start = (elevations[0].elevation * 3.28084).toFixed(0)
  $("#starting-point").text("Starting elevation: " + start + " ft")

  var highPoint = elevations.slice().sort(function(a,b){
    return b.elevation - a.elevation
  })

  var summit = (highPoint[0].elevation * 3.28084).toFixed(0)
  $("#high-point").text("High point: " + summit + " ft")
}

TripView.prototype.displayCoordinates = function(event){
  var coordinates = event.latLng
  $("#longitude").html("lng: " + coordinates.lng().toFixed(4))
  $("#latitude").html("lat: " + coordinates.lat().toFixed(4))
}

TripView.prototype.displayMarkerError = function(){
  $('#flash-alerts .space').prepend('<div class="alert alert-danger">Please set a location before saving your note</div>');
  setTimeout(function(){$('.alert').remove()}, 3000);
  return
}

TripView.prototype.displayImgNote = function(){
  console.log("hello")
 $('.no-note').remove()
  var img_url =  $('.uploaded-photo').attr('src')
  if (img_url) {
    img_url = '<img class="li-trip-photo" src="' + img_url + '">'
  } else {
    img_url = ''
  }
}


