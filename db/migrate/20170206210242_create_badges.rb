class CreateBadges < ActiveRecord::Migration[5.0]
  def change
    create_table :badges do |t|
      t.int :image_id
      t.string :description

      t.timestamps
    end
  end
end
