describe('TripController', function(){
  it('does a thing', function(){
    trip = new TripController(new TripView, new TripModel)
    expect(trip).toBe(TripController)
  }
}
