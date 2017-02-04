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
  $('#submit-marker').show()
  $('.jumbotron').append(noteForm())
}

TripView.prototype.showAddMarker = function(){
  $('#submit-marker').hide()
  $('#add-marker').show()
}

function noteForm(){
  return '<div class="form-group">' +
             '<label for="note">Note:</label>' +
             '<textarea class="form-control" rows="5" id="new-note"></textarea>' +
         '</div>'
}
