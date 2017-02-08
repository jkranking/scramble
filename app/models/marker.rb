class Marker < ApplicationRecord
  belongs_to :trip
  has_one :photo

  validates_presence_of :lat, :lng, :trip_id
  validates_numericality_of :lat, :lng, :trip_id

  def image_url
    return nil if self.photo.nil?
    photo.image.try(:url)
  end
end
