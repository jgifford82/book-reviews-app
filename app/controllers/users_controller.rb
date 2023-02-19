class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create], raise: false

  def index
    user = User.all
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    if user.valid?
      render json: user, status: :created
    else
      render json: {
               errors: user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
