class BooksController < ApplicationController

    # GET all books
    def index
        book = Book.all 
        render json: book
    end
end
