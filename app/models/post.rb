class Post < ActiveRecord::Base
	validates_presence_of :user_id
	belongs_to :user 
	has_many :comments
end