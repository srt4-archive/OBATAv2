class Alert < ActiveRecord::Base
  belongs_to :agency
  belongs_to :route
end
