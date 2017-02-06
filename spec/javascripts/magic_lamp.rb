MagicLamp.fixture do
  @trip = Trip.new
  render :template => "trips/new"
end

MagicLamp.fixture do
  User.find_by(email: 'email@fake.com').destroy
  @trip = FactoryGirl.create(:trip)
  render :template => "trips/show"
end
