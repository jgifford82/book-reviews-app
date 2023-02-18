class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :book_id
end
