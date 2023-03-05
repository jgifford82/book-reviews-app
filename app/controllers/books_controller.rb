class BooksController < ApplicationController

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

private 
    def book_params
        params.permit(:title, :author, :genre)
    end

end
