class Marker < ApplicationRecord
  belongs_to :trip

  validates_presence_of :lat, :lng, :trip_id, :note
  validates_numericality_of :lat, :lng, :trip_id
end
