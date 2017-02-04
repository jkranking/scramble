class CreateMarkers < ActiveRecord::Migration[5.0]
  def change
    create_table :markers do |t|
      t.integer :trip_id, null: false
      t.decimal :lat, null: false
      t.decimal :lng, null: false
      t.text :note

      t.timestamps
    end
  end
end
