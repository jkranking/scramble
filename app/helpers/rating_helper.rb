module RatingHelper
  def has_user_given_rating?(trip)
    return true if trip.trip_ratings.find_by(user_id: current_user.id)
  end

  def rating(trip)
    trip_rating = trip.trip_ratings.find_by(user_id: current_user.id)
    trip_rating.try(:rating)
  end
end
