class Trip < ApplicationRecord

  belongs_to :user
  has_many :pings
  has_many :markers

  def ordered_markers_by_created_at
    markers.order("created_at ASC")
  end

  validates_presence_of :latitude, :longitude, :user_id, :zoom, :name
  validates_numericality_of :latitude, :longitude, :user_id, :zoom
end
