class RemoveRetrievedFromAlerts < ActiveRecord::Migration
  def up
    remove_column :alerts, :retrieved
      end

  def down
    add_column :alerts, :retrieved, :string
  end
end
