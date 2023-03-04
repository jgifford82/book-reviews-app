class Book < ApplicationRecord  
# Book class inherits from ApplicationRecord, which inherits from ActiveRecord::Base, which allows use of macro methods, like has_many & has_many :through (sets up a connection with review & user models so we can use book = Book.first; book.users; book.reviews).
    has_many :reviews
    has_many :users, through: :reviews

# makes sure title, authhor, genre exists & title is unique
    validates :title, presence: true, uniqueness: true
    validates :author, presence: true
    validates :genre, presence: true

end
