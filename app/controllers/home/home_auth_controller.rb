class Home::HomeAuthController < ActionController::Base

	def sign_up
		sign_up_data = {
			name: params[:name],
			email_id: params[:email_id],
			is_active: 'true'
		}
		sign_up_info = ::User.create!(sign_up_data)
		return result({}, { message: 'User Signed Up successfully' }, :ok)
	end

	def login
		user = ::User.where(name: params[:username], email_id: params[:password]).first
		if user.blank?
			return result({}, {message: 'User not registered'}, :bad_request)
		else
			return result({user_id: user.id}, {message: 'Login successfully'}, :ok)
		end
	end

	private

	def result(payload, meta, status = :ok)
    render json: {
      payload: payload ,
      meta: meta
    }, status: status
  end

end