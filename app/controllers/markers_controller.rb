class MarkersController < ApplicationController
  def create
    @trip = Trip.find(params[:trip_id])
    @marker = @trip.markers.create(marker_params)
    respond_to do |format|
      format.json { render json: @marker }
    end
  end

  def update
    @marker = Marker.find(params[:id])
    @marker.update(marker_params)
  end

  def destroy
    @marker = Marker.find(params[:id])
    @marker.destroy
  end

  private

  def marker_params
    params.require(:marker).permit(:lng, :lat, :note)
  end
end
