class Trip < ApplicationRecord
  # belongs_to :user
  # has_many :pings

  validates_presence_of :latitude, :longitude, :user_id, :zoom
  validates_numericality_of :latitude, :longitude, :user_id, :zoom
end
