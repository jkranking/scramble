var loadPings = function(id, map){
  $.get({
    url: "/get_pings",
    data: {id: id}
  }).done(function(response){
    response.forEach(function(ping){
      newPing({lat: Number(ping.lat), lng: Number(ping.long)}, map)
    })
  })
}

var setMap = function() {
  var lat = Number($('.latitude').attr('id'))
  var lng = Number($('.longitude').attr('id'))
  var zoom = Number($('.zoom').attr('id'))
  var myLatlng = {lat: lat, lng: lng};

  return new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: myLatlng
  });
}
