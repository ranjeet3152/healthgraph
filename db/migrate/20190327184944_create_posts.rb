class CreatePosts < ActiveRecord::Migration
  def up
    create_table :posts do |t|
    	t.boolean :is_active, index: true
    	t.text :data
    	t.integer :user_id, index: true, null: false
    	t.timestamps
    end
  end

  def down
  	drop_table :posts
  end
end
