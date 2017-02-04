class Users::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render '/users/show.html.erb'
  end

  def trips_index
    user = User.find(params[:user_id])
    @trips = user.trips
    render '/users/trips_index.html.erb'
  end

end
