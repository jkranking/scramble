class CreateBadgesUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :badges_users do |t|
      t.integer :badge_id
      t.integer :user_id

      t.timestamps
    end
  end
end
