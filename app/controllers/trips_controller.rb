class TripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.create(trip_params)
    redirect_to trips_path
  end

  private

  def trip_params
    params.require(:trip).permit(:user_id, :zoom, :latitude, :longitude)
  end
end
