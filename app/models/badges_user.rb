class BadgesUser < ApplicationRecord
  belongs_to :badge
  belongs_to :user

  validates_presence_of :user_id, :badge_id
  validates_numericality_of :user_id, :badge_id
end
