class CreateAlerts < ActiveRecord::Migration
  def change
    create_table :alerts do |t|
      t.references :agency
      t.references :route
      t.text :details
      t.date :start
      t.date :end
      t.datetime :retrieved

      t.timestamps
    end
    add_index :alerts, :agency_id
    add_index :alerts, :route_id
  end
end
