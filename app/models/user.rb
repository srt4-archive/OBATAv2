class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :transam, :admin
  
  has_many :comments
  has_many :votes
  has_many :reports
	
	def self.find_for_database_authentication(conditions={})
	  self.where("name = ? OR email = ?",  conditions[:name], conditions[:name]).limit(1).first 
	end
end
