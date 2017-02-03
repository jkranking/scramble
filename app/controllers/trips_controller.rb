class TripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = current_user.trips.create(trip_params)
    Ping.create_multiple_pings(@trip, pings)
    redirect_to trips_path
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def get_pings
    @trip = Trip.find(params[:id])
    respond_to do |format|
      format.json { render json: @trip.pings }
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:zoom, :latitude, :longitude, :name)
  end

  def pings
    params.require(:pings)
  end
end
