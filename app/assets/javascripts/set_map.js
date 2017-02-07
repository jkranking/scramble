var setMap = function(trip) {

  var zoom = Number(trip.zoom)
  var coordinates = {lat: Number(trip.latitude), lng: Number(trip.longitude)};

  return new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: coordinates,
    mapTypeId: 'terrain',
    styles: [
    	{
    		"stylers": [{ "saturation": +50 }]
    	},
  		// {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    	{
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#b9d3c2'}]
      },
    ]
  });
}
