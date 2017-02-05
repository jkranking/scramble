console.log(  'test is running')

describe('TripController', function(){
  before each
  it('does a thing', function(){
    trip = new TripController(new TripView, new TripModel(map))
    expect(trip).toBe(TripController)
  })
})
