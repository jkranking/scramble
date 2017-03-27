class TripRatingsController < ApplicationController

  def create
  	TripRating.create(user_id: current_user.id, trip_id: params[:trip_id], rating: params[:rating])
  end

  def update
    rating = TripRating.find_by(trip_id: params[:trip_id], user_id: current_user.id)
    rating.update(rating: params[:rating])
  end
  
 end
