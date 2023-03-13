class ReviewsController < ApplicationController
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

private

    def review_params
        params.permit(:comment)
    end

    def render_not_found_response
        render json: { error: "Reviews not found" }, status: :not_found
    end
    
end
