class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.integer :zoom, null: false
      t.integer :user_id

      t.timestamps
    end
  end
end
