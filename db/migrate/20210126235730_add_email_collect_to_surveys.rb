class AddEmailCollectToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :email_collect, :boolean
  end
end
