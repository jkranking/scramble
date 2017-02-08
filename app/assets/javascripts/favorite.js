$(document).ready(function(){
  if (window.favorited) { $('#favorite-heart').click() }

  $('#favorite-heart').click(function(event){
    $.post({
      url: '/favorites',
      data: {favorite: {user_id: window.user_id, trip_id: window.trip.id } }
    }).done(function(response){
      console.log(response.message)
    }).fail(function(response){
      console.log(response.message)
    })
  })
})
