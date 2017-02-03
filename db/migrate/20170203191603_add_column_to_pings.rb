class AddColumnToPings < ActiveRecord::Migration[5.0]
  def change
    add_column :pings, :order, :integer
  end
end
