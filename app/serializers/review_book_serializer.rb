class ReviewBookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :genre
end
