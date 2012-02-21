class Report < ActiveRecord::Base
  belongs_to :user
  has_many :votes
  has_many :comments
  
	'''
	Overrides the comments self.user method to handle
	anonymous users. Returns a new User with .username
	of "Anonymous" 
	'''
	def user
		@user = User.find_by_id(self.user_id)
		if @user.nil? 
			@user = User.new
			@user.email = "Anonymous"
		end
		return @user
	end	
end
