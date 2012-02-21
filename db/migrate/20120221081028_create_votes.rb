class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user
      t.references :post

      t.timestamps
    end
    add_index :votes, :user_id
    add_index :votes, :post_id
  end
end
