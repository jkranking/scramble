class AddColumnToTripsTableName < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :name, :string, default: 'BEST TRIP EVER'
  end
end
