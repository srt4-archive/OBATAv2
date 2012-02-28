class Agency < ActiveRecord::Base
  has_many :alerts
  has_many :routes
end
