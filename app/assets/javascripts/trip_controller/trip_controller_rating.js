TripController.prototype.addRating = function(rated, rating, id){
  if (!rated) {
    $(".stars label.star").click(function(event){
      var form = $(event.target)
      var star = form.attr('for')
      $.post('/ratings', {rating :star, trip_id :id}, function() {
      })
    })
  } else {
    var starLabel = $("input[id=" + rating + "]")
    $(starLabel).click()

    $(".stars label.star").click(function(event){
      var form = $(event.target)
      var star = form.attr('for')
      $.ajax({
        type: 'PUT',
        url: "/ratings",
        data: {rating :star, trip_id :id}
      })
    })
  }
}
