function TripView(){}

// TripView.prototype.render = function(){
//   'do it'
// }

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
  $('#update-trip').hide()
  $('#submit-marker').show()
  $('#cancel-marker').show()
  $(noteForm()).insertAfter($('#add-marker'))
}

TripView.prototype.showAddMarkerAndEditTrip = function(){
  $('#submit-marker').hide()
  $('#cancel-marker').hide()
  $('#note-form').remove()
  $('#update-trip').hide()

  $('#add-marker').show()
  $('#edit-trip').show()
}

TripView.prototype.showUpdateTrip = function(){
  $('#submit-marker').hide()
  $('#cancel-marker').hide()
  $('#add-marker').hide()
  $('#note-form').remove()
  $('#edit-trip').hide()
  $('#update-trip').show()
}

function noteForm(){
  return '<div class="form-group" id="note-form">' +
             '<label for="note">Note:</label>' +
             '<textarea class="form-control" rows="5" id="new-note"></textarea>' +
         '</div>'
}
