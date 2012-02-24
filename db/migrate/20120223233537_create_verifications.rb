class CreateVerifications < ActiveRecord::Migration
  def change
    create_table :verifications do |t|
      t.references :user
      t.references :report

      t.timestamps
    end
    add_index :verifications, :user_id
    add_index :verifications, :report_id
  end
end
