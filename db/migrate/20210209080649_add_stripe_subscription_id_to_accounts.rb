class AddStripeSubscriptionIdToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :stripe_subscription_id, :string
  end
end
