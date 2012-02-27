class AddLatlonToReports < ActiveRecord::Migration
  def change
    add_column :reports, :lat, :decimal, :precision => 15, :scale => 10

    add_column :reports, :lon, :decimal, :precision => 15, :scale => 10

  end
end
