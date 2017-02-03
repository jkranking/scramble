class Ping < ApplicationRecord
  belongs_to :trip

  validates_presence_of :trip_id, :lat, :lng

  def self.create_multiple_pings(trip, pings)
    pings.each do |ping|
      Ping.create(lat: ping.lat, lng: ping.lng, trip_id: trip.id)
    end
  end
end
