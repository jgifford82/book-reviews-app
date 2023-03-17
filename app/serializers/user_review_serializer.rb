class UserReviewSerializer < ActiveModel::Serializer
  # these are the only attributes returned in the JSON response for a user's reviews so it's no longer returning unwanted attributes like created_at, updated_at, & password digest
  attributes :id, :comment, :book_id, :user_id
end
