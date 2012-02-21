class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :title
      t.string :route
      t.integer :stop
      t.text :body
      t.references :user

      t.timestamps
    end
    add_index :reports, :user_id
  end
end
