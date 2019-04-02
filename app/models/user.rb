class User < ActiveRecord::Base
	has_many :posts
	has_many :comments
	validates_uniqueness_of :email_id, uniqueness: true
	validates_uniqueness_of :name
	validates_presence_of :email_id
	validates_presence_of :name
end