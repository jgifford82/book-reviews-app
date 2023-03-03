class BooksController < ApplicationController

    # GET all books
    def index
        book = Book.all.order(:title) 
        render json: book
    end
end
