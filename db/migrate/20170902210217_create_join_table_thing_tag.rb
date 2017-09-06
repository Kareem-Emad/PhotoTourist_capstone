class CreateJoinTableThingTag < ActiveRecord::Migration
  def change
    create_join_table :things, :tags do |t|
       t.index [:thing_id, :tag_id]
      # t.index [:tag_id, :thing_id]
    end
  end
end
