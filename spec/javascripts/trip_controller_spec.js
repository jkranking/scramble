describe('TripController', function(){
  var map;
  var model;
  var view;
  var trip = {"latitude":"47.455951443369976", "longitude":"-122.047119140625", "zoom":"7"}

  var assign_stubbed_map = function() {
    map = jasmine.createSpy('map');
    view = jasmine.createSpy('view');
    view = new TripView
    model = jasmine.createSpy('model');
    view = new TripModel(map)
    //spyOn(subject, 'setMap').andReturn(map);
  }

  beforeEach(function(){
    assign_stubbed_map()
  })

  it('establishes a view', function(){
    trip = new TripController(view, model)
    expect(trip.view).toBeDefined()
  })

  it('establishes a model', function(){
    trip = new TripController(view, model)
    expect(trip.model).toBeDefined()
  })

  it('defaults a click value to true', function(){
    trip = new TripController(view, model)
    expect(trip.clicked).toBe(true)
  })

})
