class TripRatingsController < ApplicationController

  def create
  	TripRating.create(user_id: current_user.id, trip_id: params[:trip_id], rating: params[:rating])
  end
 end 