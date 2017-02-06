describe('TripView', function(){

  var view;

  beforeEach(function(){
    view = new TripView
  })

  it('establishes a view', function(){
    expect(view).toBeDefined()
  })

  describe('view.showSubmit()', function(){

    beforeEach(function(){
      MagicLamp.load("trips/new")
    })

    it ('hides #add-ping button', function(){
      view.showSubmit()
      expect($('#add-ping').is(':visible')).toBe(false)
    })

    it ('shows #submit-pings button', function(){
      view.showSubmit()
      expect($('#submit-pings').is(':visible')).toBe(true)
    })
  })

  describe('view.showAdd()', function(){

    beforeEach(function(){
      MagicLamp.load("trips/new")
    })

    it ('hides #submit-pings button', function(){
      view.showAdd()
      expect($('#submit-pings').is(':visible')).toBe(false)
    })

    it ('shows #add-pings button', function(){
      view.showAdd()
      expect($('#add-ping').is(':visible')).toBe(true)
    })

  })

  describe('view.showSubmitMarker()', function(){

    beforeEach(function(){
      MagicLamp.load("trips/show")
    })

    it ('hides the add-marker button', function(){
      view.showSubmitMarker()
      expect($('#add-marker').is(':visible')).toBe(false)
    })

    it ('hides the submit-marker button', function(){
      view.showSubmitMarker()
      expect($('#submit-marker').is(':visible')).toBe(true)
    })

    it ('inserts a new note text field', function(){
      view.showSubmitMarker()
      expect($('#note-form').length).toBe(1)
    })

    it ('hides the update-trip button', function(){
      view.showSubmitMarker()
      expect($('#update-trip').is(':visible')).toBe(false)
    })

    it ('shows the cancel-marker button', function(){
      view.showSubmitMarker()
      expect($('#cancel-marker').is(':visible')).toBe(true)
    })

    it ('hides the edit-trip button', function(){
      view.showSubmitMarker()
      expect($('#edit-trip').is(':visible')).toBe(false)
    })
  })

  describe('view.showAddMarkerAndEditTrip()', function(){
    beforeEach(function(){
      MagicLamp.load("trips/show")
    })

    it ('shows the add-marker button', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#add-marker').is(':visible')).toBe(true)
    })

    it ('hides the submit-marker button', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#submit-marker').is(':visible')).toBe(false)
    })

    it ('removes a new note text field', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#note-form').length).toBe(0)
    })

    it ('hides the update-trip button', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#update-trip').is(':visible')).toBe(false)
    })

    it ('hides the cancel-marker button', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#cancel-marker').is(':visible')).toBe(false)
    })

    it ('shows the edit-trip button', function(){
      view.showAddMarkerAndEditTrip()
      expect($('#edit-trip').is(':visible')).toBe(true)
    })
  })

  describe('view.showUpdateTrip()', function(){
    beforeEach(function(){
      MagicLamp.load("trips/show")
    })

    it ('hides the add-marker button', function(){
      view.showUpdateTrip()
      expect($('#add-marker').is(':visible')).toBe(false)
    })

    it ('hides the submit-marker button', function(){
      view.showUpdateTrip()
      expect($('#submit-marker').is(':visible')).toBe(false)
    })

    it ('removes a new note text field', function(){
      view.showUpdateTrip()
      expect($('#note-form').length).toBe(0)
    })

    it ('shows the update-trip button', function(){
      view.showUpdateTrip()
      expect($('#update-trip').is(':visible')).toBe(true)
    })

    it ('hides the cancel-marker button', function(){
      view.showUpdateTrip()
      expect($('#cancel-marker').is(':visible')).toBe(false)
    })

    it ('hides the edit-trip button', function(){
      view.showUpdateTrip()
      expect($('#edit-trip').is(':visible')).toBe(false)
    })
  })

})
