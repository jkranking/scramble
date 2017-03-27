class TripsController < ApplicationController
  
  def index
    Trip.reset

    @sort_style = 'newest'
    @trips = Trip.recent_ordered
    if params[:sort_by_newest] == "true"
    elsif params[:sort_by_rating] == "true"
      @sort_style = 'rating'
      @trips = Trip.ordered_by_average
    elsif params[:sort_by_newest] == "false"
      @sort_style = 'none'
      @trips = Trip.standard_ordered
    end
  end

  def user_trips_index
    user = User.find(params[:user_id])
    @trips = user.trips
    @favorited_trips = user.favorite_trips
    render '/trips/user_trips_index.html.erb'
  end

  def new
    @trip = Trip.new
  end

  def user_badges_index
    user = User.find(params[:user_id])
    @badges = user.badges
    render '/trips/user_badges_index.html.erb'
  end

  def create
    if user_signed_in?
      if pings.to_unsafe_hash.count > 1
        @trip = current_user.trips.create(trip_params)
          if !BadgesUser.exists?(badge_id: 1, user_id: current_user)
            BadgesUser.create(badge_id: 1, user_id: current_user.id)
            flash[:success] = "You earned your first badge!"
          end

          if (current_user.trips.all.length >= 10) && !BadgesUser.exists?(badge_id: 2, user_id: current_user)
            BadgesUser.create(badge_id: 2, user_id: current_user.id)
            flash[:success] = "You earned your second badge!"
          end

          if (current_user.badges.length >= 2) && !BadgesUser.exists?(badge_id: 3, user_id: current_user)
            BadgesUser.create(badge_id: 3, user_id: current_user.id)
            flash[:success] = "You've gone platinum!"
          end

        Ping.create_multiple_pings(@trip, pings)
        respond_to do |format|
          format.json { render json: @trip}
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
    @photo = Photo.new
    @users_trip = (@trip.user == current_user && user_signed_in?)
  end

  def edit
    @trip = Trip.find(params[:id])
  end

  def update
    @trip = Trip.find(params[:id])
    if user_signed_in? && @trip.user == current_user
      if @trip.update(trip_params)
        @trip.pings.destroy_all
        Ping.create_multiple_pings(@trip, pings)
      else
        respond_to do |format|
          format.json { render :json => Trip.find(params[:id]) , :status => 422 }
        end
      end
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

  def recent
    trips = Trip.recent_ordered_json
    render json: trips
  end

  def rating
    trips = Trip.ordered_by_average_json
    render json: trips
  end

  def standard_sort
    trips = Trip.standard_ordered_json
    render json: trips
  end

  def reset
    Trip.reset
  end

  private

  def trip_params
    params.require(:trip).permit(:zoom, :latitude, :longitude, :name, :distance)
  end

  def pings
    params.require(:pings)
  end
end
