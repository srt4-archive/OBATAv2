class ApplicationController < ActionController::Base
  protect_from_forgery
    
    def mobile_device?
      user_agent = request.user_agent
      user_agent =~ /Mobile|webOS/
      return true
    end

    helper_method :mobile_device?

end
