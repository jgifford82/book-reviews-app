require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🌱 Seeding data..."

# Destroy all records from tables before executing the rest of the seed code so tables don't get too big while experimenting with project. 
# This doesn't overwrite ID numbers. Can use "rake db:reset" instead of destroy_all to drop database, run migrations, then run seed file. No need to run "rake db:migration" or "rake db:seed" in that case. 
User.destroy_all
Book.destroy_all
Review.destroy_all

# reset all id's to start from 1 after all records have been destroyed and the database is re-seeded
ActiveRecord::Base.connection.tables.each do |t|
    ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

# create 5 users
5.times do
    user = User.create!(
        username: Faker::Internet.unique.username,
        password: Faker::Internet.password(min_length: 5,max_length: 8)
    )
# for each user, create 2 books (10 books total)
    2.times do
        book = Book.create!(
            title: Faker::Book.unique.title,
            author: Faker::FunnyName.two_word_name,
            genre: Faker::Book.genre
    )

        # create between 1 and 2 reviews for each book
        rand(1..2).times do
            book.reviews.create!(
                comment: Faker::TvShows::NewGirl.unique.quote,
                user_id: user.id,
                book_id: book.id
            )
        end
    end
end

puts "✅ Done seeding!"

p "Created #{Book.count} books"
p "Created #{User.count} users"
p "Created #{Review.count} reviews"