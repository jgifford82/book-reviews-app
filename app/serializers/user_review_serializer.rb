class UserReviewSerializer < ActiveModel::Serializer
  # these are the only attributes returned in the JSON response for a user's reviews so it's no longer returning unwanted attributes like created_at, updated_at, & password digest
  attributes :id, :comment, :book_id, :user_id

  # belongs_to :book, serializer: ReviewBookSerializer

  # nesting book in user's reviews so that when a new review is created, it'll include the book and the book's attributes specifid in ReviewBookSerializer.
  attribute :book do
    ReviewBookSerializer.new(object.book)
  end
end
