class Users::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render '/users/show.html.erb'
  end
end
