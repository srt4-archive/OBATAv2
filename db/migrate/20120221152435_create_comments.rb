class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body
      t.references :user
      t.references :report

      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :report_id
  end
end
