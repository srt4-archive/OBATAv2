class Route < ActiveRecord::Base
  belongs_to :agency
  has_many :alerts
end
