class UserSerializer < ActiveModel::Serializer
  # ActiveModel::Serializer gem enables customization of JSON to be rendered without sacrificing Rails principles of "convention over configuration" and separation of concerns.
  # list of attributes that we want to be included in JSON rendered by controller methods
  attributes :id, :username

  # access the books a user has reviewed
  has_many :books
end
