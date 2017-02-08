module FavoriteHelper
  def favorited?(trip_id, user_id)
    !Favorite.find_by(trip_id: trip_id, user_id: user_id).nil?
  end
end
