class CreateComments < ActiveRecord::Migration
  def up
    create_table :comments do |t|
    	t.boolean :is_active
    	t.integer :post_id, index: true
    	t.integer :user_id, index: true
    	t.text :data
    	t.timestamps
    end
  end

  def down
  	drop_table :comments
  end

end
