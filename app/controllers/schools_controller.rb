class SchoolsController < ApplicationController

  def tutoring
    school = School.find(params[:id])
    render json:school
  end
  
  private
  def current_user
    current_user = User.find(session[:user_id])
  end
end
