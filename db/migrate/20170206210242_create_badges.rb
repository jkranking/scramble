class CreateBadges < ActiveRecord::Migration[5.0]
  def change
    create_table :badges do |t|
      t.integer :image_id, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
