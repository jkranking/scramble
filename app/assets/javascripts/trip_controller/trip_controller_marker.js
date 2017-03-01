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

  if (!this.clicked){this.view.displayMarkerError(); return}

  var controller = this
  var trip_id = window.trip.id
  var marker = this.model.markers.slice(-1)[0]
  var the_marker = marker
  var coordinates = marker.getPosition()
  var note = $('#new-note').val()
  var photo_id
  if (window.photo) { photo_id = window.photo.id }

  $.post({
    url: "/trips/" + trip_id + "/markers",
    data: {marker: {lat: coordinates.lat(),
                    lng: coordinates.lng(),
                   note: note},
                  photo: photo_id,
             AUTH_TOKEN: $('meta[name=csrf-token]').attr('content')}
  }

  ).done(function(response){

    img_url = controller.view.displayImgNote()
    controller.view.updateTripNotes(the_marker, response, note)

    var marker = the_marker

    controller.view.showAddMarkerAndEditTrip()

    var label = (marker.getLabel() - 1)

    var content = contentString({note: note, id: response.id}, label, img_url)

    var infowindow = new google.maps.InfoWindow({
      content: content
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
    $('#flash-alerts .space').prepend('<div class="alert alert-success">Note saved!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
  }

  ).fail(function(){
    $('#flash-alerts .space').prepend('<div class="alert alert-danger">Somthing went wrong with your note!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
  })
}

TripController.prototype.cancelNewMarker = function(event) {
  event.preventDefault()
  $('.uploaded-photo-section').remove()
  window.photo = null
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
  console.log('parent', $(event.target).parent().parent().children('.trip-image').children().attr('src'))
  var img_url = $(event.target).parent().parent().children('.trip-image').children().attr('src')
  var marker = $(event.target)
  var marker_id = marker.attr('href').match(/\d+$/)[0]
  var marker_label = marker.attr('id').match(/\d+$/)[0]
  if ($(event.target))
  var note_content = $('#note-content-' + marker_label).html()
  $('#note-' + marker_label).html(editNoteForm(note_content, marker_label, marker_id))
  marker = this.model.markers[marker_label]
  if (img_url) { marker.img_url = img_url }

  marker.setDraggable(true)
}

TripController.prototype.updateMarker = function(event) {
  event.preventDefault()
  var marker = $(event.target)
  var marker_id = marker.attr('href').match(/\d+$/)[0]
  var marker_label = marker.attr('id').match(/\d+$/)[0]

  marker = this.model.markers[marker_label]
  var coordinates = marker.getPosition()
  var note_content = $('#update-note-' + marker_label).val()

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
    var img_url = ''
    var icon = 'fa fa-map-marker fa-2x'
    if (marker.img_url) { img_url = '<img src="' + marker.img_url + '">'; icon = "fa fa-camera-retro fa-lg" }


    $('#note-' + marker_label).html(contentString({note: note_content, id: marker_id}, marker_label, img_url))
    $('#marker-' + marker_id).html(replaceListItem(marker_label, note_content,  coordinates, icon))

    $('#flash-alerts .space').prepend('<div class="alert alert-success">Note updated!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
  }

  ).fail(function(){
    $('#flash-alerts .space').prepend('<div class="alert alert-danger">Something went wrong!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
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
        $('#flash-alerts .space').prepend('<div class="alert alert-success">Note deleted!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
  }).fail(function(){
    $('#flash-alerts .space').prepend('<div class="alert alert-danger">Something went wrong!</div>')
    setTimeout(function(){$('.alert').remove()}, 3000)
  })
}
