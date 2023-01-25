class ApplicationMailer < ActionMailer::Base
  default from: 'clientviews Notifications <no-reply@mail.app.clientviews.com>'
  layout 'bootstrap-mailer'
end
