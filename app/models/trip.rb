class Trip < ApplicationRecord

  belongs_to :user
  has_many :pings
  has_many :markers
  has_many :trip_ratings

  validates_presence_of :latitude, :longitude, :user_id, :zoom, :name
  validates_numericality_of :latitude, :longitude, :user_id, :zoom

  def ordered_pings
    self.pings.sort_by{ |ping| ping.order }
  end

  def ordered_markers_by_created_at
    markers.order("created_at ASC")
  end

  def get_average_rating
    ratings = self.trip_ratings
    return 0 if ratings.empty?
    total = ratings.inject(0) { |n, trip_rating| n + trip_rating.rating }
    average = (total / ratings.length.to_f) * 20
  end

  def static_path
    path = []
    self.pings.each do |ping|
      path << "#{ping.lat},#{ping.lng}"
    end
    path = path.join('|')
  end

  def static_key
    ENV['STATIC_MAPS_KEY']
  end

  @@counter = -1

  def self.reset
    @@counter = -1
  end

  def self.ordered_by_average
    @@counter += 1
    Trip.all.sort_by{ |trip| trip.get_average_rating }.reverse[0+(@@counter*20)..19+(@@counter*20)].to_json(methods: [:user, :get_average_rating, :static_path, :static_key])
  end

  def self.ordered_json
    @@counter += 1
    order("created_at DESC")[0+(@@counter*20)..19+(@@counter*20)].to_json(methods: [:user, :get_average_rating, :static_path, :static_key])
  end

  def self.standard_ordered_json
    @@counter += 1
    order("created_at ASC")[0+(@@counter*20)..19+(@@counter*20)].to_json(methods: [:user, :get_average_rating, :static_path, :static_key])
  end


end
