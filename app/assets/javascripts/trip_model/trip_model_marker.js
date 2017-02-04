TripModel.prototype.loadMarkersList = function(){
  window.markers.forEach(function(marker){
    var contentString = marker.note;

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = newMarker({lat: Number(marker.lat), lng: Number(marker.lng)}, this.map)

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    // marker.addListener('mouseover', function() {
    //   infowindow.open(map, marker);
    // });

    // marker.addListener('mouseout', function() {
    //   infowindow.close();
    // });

    this.markers.push(marker)
  }.bind(this))
}

var labelIndex = 0

newMarker = function(location, map){
  labelIndex++
  return new google.maps.Marker({
    position: location,
    map: map,
    label: labelIndex.toString(),
    draggable: true // this lets you drag the pings
  });
}
