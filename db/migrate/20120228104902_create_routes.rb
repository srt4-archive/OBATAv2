class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.integer :number
      t.string :name
      t.references :agency

      t.timestamps
    end
    add_index :routes, :agency_id
  end
end
