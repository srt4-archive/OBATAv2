class AddUniqueIndexToAlerts < ActiveRecord::Migration
  def change
	add_index :alerts, [:agency_id, :route_id, :details, :start, :end],{ :name => "Report_index", :unique => true }
  end
end
