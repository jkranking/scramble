describe('TripView', function(){
  var map;
  var model;
  var view;
  var trip = {"latitude":"47.455951443369976", "longitude":"-122.047119140625", "zoom":"7"}

  var assign_stubbed_map = function() {
    view = new TripView
    //spyOn(subject, 'setMap').andReturn(map);
  }

  beforeEach(function(){
    assign_stubbed_map()
  })

  it('establishes a view', function(){
    expect(view).toBeDefined()
  })

  describe('view.showSubmit()', function(){
    it ('calls the hide function', function(){
      $.fn.hide = jasmine.createSpy('hide spy')
      view.showSubmit()
      expect($.fn.hide).toHaveBeenCalled()
    })

    it ('calls the show function', function(){
      $.fn.show = jasmine.createSpy('show spy')
      view.showSubmit()
      expect($.fn.show).toHaveBeenCalled()
    })
  })

  describe('view.showAdd()', function(){
    it ('calls the hide function', function(){
      $.fn.hide = jasmine.createSpy('hide spy')
      view.showAdd()
      expect($.fn.hide).toHaveBeenCalled()
    })

    it ('calls the show function', function(){
      $.fn.show = jasmine.createSpy('show spy')
      view.showAdd()
      expect($.fn.show).toHaveBeenCalled()
    })
  })

  describe('view.showSubmitMarker()', function(){
    it ('calls the hide function', function(){
      $.fn.hide = jasmine.createSpy('hide spy')
      view.showSubmitMarker()
      expect($.fn.hide).toHaveBeenCalled()
    })

    it ('calls the show function', function(){
      $.fn.show = jasmine.createSpy('show spy')
      view.showSubmitMarker()
      expect($.fn.show).toHaveBeenCalled()
    })


    it ('calls the insertAfter function', function(){
      $.fn.insertAfter = jasmine.createSpy('insertAfter spy')
      view.showSubmitMarker()
      expect($.fn.insertAfter).toHaveBeenCalled()
    })

    it ('calls the noteForm function', function(){
      noteForm = jasmine.createSpy('noteForm spy')
      view.showSubmitMarker()
      expect(noteForm).toHaveBeenCalled()
    })
  })

  describe('view.showAddMarkerAndEditTrip()', function(){
    it ('calls the hide function', function(){
      $.fn.hide = jasmine.createSpy('hide spy')
      view.showAddMarkerAndEditTrip()
      expect($.fn.hide).toHaveBeenCalled()
    })

    it ('calls the show function', function(){
      $.fn.show = jasmine.createSpy('show spy')
      view.showAddMarkerAndEditTrip()
      expect($.fn.show).toHaveBeenCalled()
    })


    it ('calls the remove function', function(){
      $.fn.remove = jasmine.createSpy('remove spy')
      view.showAddMarkerAndEditTrip()
      expect($.fn.remove).toHaveBeenCalled()
    })
  })

  describe('view.showUpdateTrip()', function(){
    it ('calls the hide function', function(){
      $.fn.hide = jasmine.createSpy('hide spy')
      view.showUpdateTrip()
      expect($.fn.hide).toHaveBeenCalled()
    })

    it ('calls the show function', function(){
      $.fn.show = jasmine.createSpy('show spy')
      view.showUpdateTrip()
      expect($.fn.show).toHaveBeenCalled()
    })


    it ('calls the remove function', function(){
      $.fn.remove = jasmine.createSpy('remove spy')
      view.showUpdateTrip()
      expect($.fn.remove).toHaveBeenCalled()
    })
  })



})
