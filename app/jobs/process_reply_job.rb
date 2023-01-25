class ProcessReplyJob < ApplicationJob
  queue_as :default

  def perform(reply)
    puts "#{reply.inspect}"
    if reply.source == 'clientviews'
      AppReplyMailer.with(reply: reply).notification_email.deliver_later
    else
      VisitorReplyMailer.with(reply: reply).notification_email.deliver_later
    end
  end
end
