class RenameLongToLng < ActiveRecord::Migration[5.0]
  def change
    rename_column :pings, :long, :lng
  end
end
