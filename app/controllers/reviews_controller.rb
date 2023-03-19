class ReviewsController < ApplicationController
  # ensures user is logged in before deleting a review   
  before_action :authorize

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # # GET all reviews
    # def index
    #     review = Review.all 
    #     render json: review
    # end

    # GET reviews for a specific book if the matching book id is found, otherwise show error
    def index
        if params[:book_id]
            book = Book.find(params[:book_id])
            reviews = book.reviews
        else 
            render json: render_not_found_response
        end
        render json: reviews
    end

    # POST 1 new review per book if a user is logged in
    # Find book by id in params & build a new review for that book if a review for that book by the current user doesnt already exist 
    # Set the user for that review to the currently logged in user found in the session
    # Save the review & return it as a response
    def create
        book = Book.find(params[:book_id])
        if book.reviews.where(user_id: session[:user_id]).exists?
          render json: { error: "You can only create one review per book" }, status: :unprocessable_entity
        else
          review = book.reviews.build(review_params)
          review.user = User.find(session[:user_id])
          if review.save
            render json: review, status: :created
          else
            render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end

    # DELETE a specific review belonging to the logged in user
    # find the review using the id parameter in the URL
    # check if the review belongs to the logged in user by comparing the user_id of the review to the user_id stored in the session
    # if they match, destroy the review, otherwise send an unauthorized response
    def destroy
      review = Review.find(params[:id])
      if review.user_id == session[:user_id]
        review.destroy
        head :no_content
        # render json: {}, status: 200
      else
        render json: { error: "You are not authorized to delete this review" }, status: :unauthorized
      end
    end

private

    def review_params
        params.permit(:comment)
    end

    def render_not_found_response
        render json: { error: "Reviews not found" }, status: :not_found
    end
    
end
