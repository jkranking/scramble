class Ping < ApplicationRecord
  belongs_to :trip

  validates_presence_of :trip_id, :lat, :long

  def self.create_multiple_pings(trip, pings)
    pings.each do |key, ping|
      p ping
      p '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      p ping["lng"]
      Ping.create(lat: ping["lat"], long: ping["lng"], trip_id: trip.id)
    end
  end
end
