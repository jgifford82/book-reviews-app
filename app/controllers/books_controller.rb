class BooksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    skip_before_action :authorize, only: [:index]

    # GET all books alphabetically by title regardless of capitalization
    def index
        # book = Book.all.order(:title) 
        book = Book.order('lower(title)').all
        render json: book
    end

     # POST a new book
    def create
        book = Book.create!(book_params)
        render json: book, status: :created
    end

    # GET a specific book including nested reviews data
    def show
        book = Book.find(params[:id])
        render json: book
    end
      
private 
    def book_params
        params.permit(:title, :author, :genre)
    end

    def render_not_found_response
        render json: { error: "Book not found" }, status: :not_found
    end

end
