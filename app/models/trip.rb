class Trip < ApplicationRecord

  belongs_to :user
  has_many :pings
  has_many :markers
  has_many :trip_ratings

  def ordered_markers_by_created_at
    markers.order("created_at ASC")
  end

  def get_average_rating
    ratings = self.trip_ratings
    total = ratings.inject(0) { |n, trip_rating| n + trip_rating.rating }
    average = (total / ratings.length.to_f) * 20
  end

  validates_presence_of :latitude, :longitude, :user_id, :zoom, :name
  validates_numericality_of :latitude, :longitude, :user_id, :zoom
end
