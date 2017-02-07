class AddColumnToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :marker_id, :integer
  end
end
