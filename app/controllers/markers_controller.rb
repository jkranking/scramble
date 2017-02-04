class MarkersController < ApplicationController
  def create
    @trip = Trip.find(params[:trip_id])
    @trip.markers.create(marker_params)
    redirect_to trip_path(@trip)
  end

  private

  def marker_params
    params.require(:marker).permit(:lng, :lat, :note)
  end
end
