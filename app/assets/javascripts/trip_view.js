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
