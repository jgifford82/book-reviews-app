class User < ApplicationRecord
    has_secure_password
    has_many :reviews
    has_many :books, through: :reviews
end

