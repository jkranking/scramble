class CreateBadgesImages < ActiveRecord::Migration[5.0]
  def change
    create_table :badges_images do |t|
      t.int :badge_id
      t.int :user_id

      t.timestamps
    end
  end
end
