class Ping < ApplicationRecord
  belongs_to :trip

  validates_presence_of :trip_id, :lat, :lng, :order

  def self.create_multiple_pings(trip, pings)
    pings.each do |key, ping|
      Ping.create(lat: ping["lat"], lng: ping["lng"], trip_id: trip.id,
        order: (key.to_i + 1))
    end
  end
end
