module TripSessionHelper
  def users_trip(trip)
    user_signed_in? && current_user == trip.user
  end
end
