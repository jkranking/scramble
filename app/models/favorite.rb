class Favorite < ApplicationRecord

  validates_uniqueness_of :user_id, scope: :trip_id
end
