class Comment < ActiveRecord::Base
	validates_presence_of :post, :user_id
	belongs_to :post
	belongs_to :user
end