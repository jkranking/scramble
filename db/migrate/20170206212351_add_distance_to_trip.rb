class AddDistanceToTrip < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :distance, :string
  end
end
