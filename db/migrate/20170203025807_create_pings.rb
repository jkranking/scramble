class CreatePings < ActiveRecord::Migration[5.0]
  def change
    create_table :pings do |t|
      t.decimal :lat, null: false
      t.decimal :long, null: false
      t.belongs_to :trip, null: false

      t.timestamps null: false
    end
  end
end
