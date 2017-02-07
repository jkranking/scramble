class TripsController < ApplicationController
  def index
    @trips = Trip.all
  end

  def user_trips_index
    user = User.find(params[:user_id])
    @trips = user.trips
    render '/trips/user_trips_index.html.erb'
  end

  def new
    @trip = Trip.new
  end


  def create
    if user_signed_in?
      if pings.to_unsafe_hash.count > 1
        @trip = current_user.trips.create(trip_params)
        Ping.create_multiple_pings(@trip, pings)
        respond_to do |format|
          format.json { render json: @trip }
        end
      else
        respond_to do |format|
          format.json { render :json => { :error_message => 'You must have at least two pings to save your trip' }, :status => 422 }
        end
      end
    else
      respond_to do |format|
        format.json { render :json => { :error_message => 'You must be signed in to save your trip' }, :status => 401 }
      end
    end
  end

  def show
    @trip = Trip.find(params[:id])
    @users_trip = (@trip.user == current_user && user_signed_in?)
  end

  def edit
    @trip = Trip.find(params[:id])
  end

  def update
    @trip = Trip.find(params[:id])
    if user_signed_in? && @trip.user == current_user
      @trip.update(trip_params)
      @trip.pings.destroy_all
      Ping.create_multiple_pings(@trip, pings)
    else
      respond_to do |format|
        format.json { render :json => { :error_message => 'You don\'t have permission to alter this trip' }, :status => 401 }
      end
    end
  end

  def destroy
    @trip = Trip.find(params[:id])
    if (user_signed_in? && current_user == @trip.user)
      @trip.destroy
      redirect_to user_trips_path(current_user)
    else
      redirect_to trip_path(@trip)
    end
  end

  def get_pings
    @trip = Trip.find(params[:id])
    respond_to do |format|
      format.json { render json: @trip.pings }
    end
  end

  private

  def trip_params
    params.require(:trip).permit(:zoom, :latitude, :longitude, :name, :distance)
  end

  def pings
    params.require(:pings)
  end
end
