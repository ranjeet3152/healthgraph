class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
    	t.string :name
    	t.string :email_id, index: true
    	t.string :token
    	t.boolean :is_active
    	t.timestamps
    end
  end

  def down
  	drop_table :users
  end

end

