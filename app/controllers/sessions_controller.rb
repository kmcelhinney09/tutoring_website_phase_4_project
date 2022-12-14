class SessionsController < ApplicationController
  skip_before_action :authorized, only: :create
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      Time.use_zone(user.time_zone) do 
        render json: user, status: :created
      end
    else
      render json: {error: {login: "invalid email or password"}}, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def current_user
    if session.include?(:user_id)
      current_user = User.find(session[:user_id])
    end
  end

  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

end
