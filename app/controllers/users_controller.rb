class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create], raise: false

  # GET all users
  def index
    user = User.all
    render json: user
  end

  # POST new user (sign up)
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    if user.valid?
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET user if the user's id is in params, otherwise get the logged in user (the user_id saved in session for auto login)
  def show
    # render json: @current_user
    # byebug
    if params[:id]
      user = User.find(params[:id])
    else 
      user = User.find_by!(id: session[:user_id])
    end
    render json: user, status: 200
  end

  private

  # permit only the parameters that we want to use. prevents users from updating attributes they shouldn't have access to, making it more secure. 
  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
