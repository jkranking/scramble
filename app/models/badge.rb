class Badge < ApplicationRecord
  has_many :badges_users
  has_many :users, :through => :badges_user

  validates_presence_of :image_id, :description
  validates_numericality_of :image_id
end
