class FavoritesController < ApplicationController
  
  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.valid?
      @favorite.save
      respond_to do |format|
        format.json { render :json => { :message => 'Favorited!' } }
      end
    else
      Favorite.find_by(favorite_params).destroy
      respond_to do |format|
        format.json { render :json => { :message => 'Unfavorited!' } }
      end
    end
  end

  def favorite_params
    params.require(:favorite).permit(:user_id, :trip_id)
  end

end
