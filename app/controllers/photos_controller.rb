class PhotosController < ApplicationController
  #before_action :set_s3_direct_post, only: [:create]

  def index
    @photos = Photo.order('created_at')
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      respond_to :js
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :title)
  end

  # def set_s3_direct_post
  #   @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  # end
end
