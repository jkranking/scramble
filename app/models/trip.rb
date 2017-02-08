class Trip < ApplicationRecord

  belongs_to :user
  has_many :pings
  has_many :markers
  has_many :trip_ratings

  validates_presence_of :latitude, :longitude, :user_id, :zoom, :name
  validates_numericality_of :latitude, :longitude, :user_id, :zoom

  def ordered_markers_by_created_at
    markers.order("created_at ASC")
  end

  def get_average_rating
    ratings = self.trip_ratings
    total = ratings.inject(0) { |n, trip_rating| n + trip_rating.rating }
    average = (total / ratings.length.to_f) * 20
  end

  @@counter = -1

  def self.reset_counter
    @@counter = -1
  end

  def self.ordered_json
    @@counter += 1
    order("created_at DESC")[0+(@@counter*20)..19+(@@counter*20)].to_json(methods: :user)
  end

end
