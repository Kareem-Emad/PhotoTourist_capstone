class AddCreatorIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :creator_id, :integer
  end
end
