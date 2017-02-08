class CreateTripRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :trip_ratings do |t|
    	t.integer :user_id, null: false
    	t.integer :trip_id, null: false
    	t.integer :rating, null: false
    end
  end
end
