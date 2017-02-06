$(document).ready(function(){
  $('#photo-upload-button').on('click', function(event){
    event.preventDefault()
    console.log('form', $('#image-upload').serialize())
  })
})
