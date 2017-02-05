TripController.prototype.markerHandler = function(event) {
  event.preventDefault()
  var markers = this.model.markers

  this.clicked = false
  var that = this

  //submitMarkerListener is global so is can be removed on a cancel
  submitMarkerListener = google.maps.event.addListenerOnce(this.model.map, 'click', function (event) {
    var coordinates = event.latLng
    var marker = newMarker({lat: coordinates.lat(), lng: coordinates.lng()}, this, true)
    markers.push(marker)
    that.clicked = true
  })
  this.view.showSubmitMarker()
}

TripController.prototype.submitMarkerHandler = function(event) {
  event.preventDefault()

  if (!this.clicked){ alert('please set a location before saving your note'); return}

  var controller = this
  var id = window.trip.id
  var marker = this.model.markers.slice(-1)[0]
  var the_marker = marker
  var coordinates = marker.getPosition()
  var note = $('#new-note').val()

  $.post({
    url: "/trips/" + id + "/markers",
    data: {marker: {lat: coordinates.lat(),
                  lng: coordinates.lng(),
                  note: note},
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }

  ).done(function(response){
    the_marker.setDraggable(false)
    var marker = the_marker

    $('#note-container').append('<b><li class="marker" id="marker-' + response.id + '">' + marker.getLabel() + '.</b> ' + note + '<blockquote class="blockquote">lat: ' + marker.getPosition().lat() + '<br>lng: ' + marker.getPosition().lng() + '</blockquote></li>')

    controller.view.showAddMarkerAndEditTrip()

    var label = (marker.getLabel() - 1)

    var content = contentString({note: note, id: response.id}, label)

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    alert('note saved!')
  }

  ).fail(function(){
    alert('something went wrong!')
  })

}

TripController.prototype.cancelNewMarker = function(event) {
  event.preventDefault()

  google.maps.event.removeListener(submitMarkerListener)
  this.view.showAddMarkerAndEditTrip()
  if (this.clicked) {
    var marker = this.model.markers.pop() //remove the placed marker
    marker.setMap(null)
    labelIndex--
  } else {
    this.clicked = true
  }
}


TripController.prototype.editMarker = function(event) {
  event.preventDefault()
  var marker = $(event.target)
  var marker_id = marker.attr('href').match(/\d+$/)[0]
  var marker_label = marker.attr('id').match(/\d+$/)[0]
  var note_content = $('#note-content-' + marker_label).html()
  $('#note-' + marker_label).html(editNoteForm(note_content, marker_label, marker_id))
  marker = this.model.markers[marker_label]
  marker.setDraggable(true)
}

TripController.prototype.updateMarker = function(event) {
  event.preventDefault()
  var marker = $(event.target)
  var marker_id = marker.attr('href').match(/\d+$/)[0]
  var marker_label = marker.attr('id').match(/\d+$/)[0]

  marker = this.model.markers[marker_label]
  var coordinates = marker.getPosition()
  console.log('label', marker_label)
  var note_content = $('#update-note-' + marker_label).val()
  console.log('note', note_content)

  $.ajax({
    type: 'PUT',
    url: "/trips/" + window.trip.id + "/markers/" + marker_id,
    data: {marker: {note: note_content,
                  lat: coordinates.lat(),
                  lng: coordinates.lng()},
            AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }

  ).done(function(response){
    marker.setDraggable(false)
    $('#note-' + marker_label).html(contentString({note: note_content, id: marker_id}, marker_label))
    console.log('marker', $('#marker-' + marker_id).html())
    $('#marker-' + marker_id).html(replaceListItem(marker_label, note_content,  coordinates))
    alert('note updated!')
  }

  ).fail(function(){
    alert('something went wrong!')
  })
}

TripController.prototype.deleteMarker = function(event) {
  event.preventDefault()

  var markers = this.model.markers

  var marker = $(event.target)
  var marker_id = marker.attr('href').match(/\d+$/)[0]
  var marker_label = marker.attr('id').match(/\d+$/)[0]
  var note_content = $('#note-content-' + marker_label).html()

  $.ajax({
    type: 'DELETE',
    url: "/trips/" + window.trip.id + "/markers/" + marker_id,
  }).done(function(){
    var marker = markers[marker_label]
    marker.setMap(null)
    $('#marker-' + marker_id).remove()
    alert('deleted!')
  }).fail(function(){
    alert('something went wrong with the deletion!')
  })
}
