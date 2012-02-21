class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user
      t.references :report

      t.timestamps
    end
    add_index :votes, :user_id
    add_index :votes, :report_id
  end
end
