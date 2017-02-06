class PhotosController < ApplicationController
  def index
    @photos = Photo.order('created_at')
  end

  # def new
  #   @photo = Photo.new
  #   respond_to do |format|
  #     format.html { render '_new', locals: {marker: @marker}, layout: false }
  #     format.js
  #   end
  # end

  def create
    p photo_params
    @photo = Photo.new(photo_params)
    if @photo.save
      respond_to do |format|
        format.json { render @photo.image.url(:thumb) }
      end
    else
      render 'new'
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :title)
  end
end
