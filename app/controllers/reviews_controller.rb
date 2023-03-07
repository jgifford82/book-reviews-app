class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # # GET all reviews
    # def index
    #     review = Review.all 
    #     render json: review
    # end

    # GET reviews for a specific book if the matching book id is found, , otherwise show error
    def index
        if params[:book_id]
            book = Book.find(params[:book_id])
            reviews = book.reviews
        else 
            render json: render_not_found_response
        end
        render json: reviews
    end

    private

    def render_not_found_response
        render json: { error: "Reviews not found" }, status: :not_found
    end
    
end
