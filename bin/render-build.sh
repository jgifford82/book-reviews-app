#!/usr/bin/env bash
# exit on error
set -o errexit

# builds the front end code
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# builds the back end code
bundle install
bundle exec rake db:migrate

# if you have seed data, run this command for the initial deploy only
# If we keep the seed command in the script, it will re-seed the data every time we push up a change, resulting in duplicate records.
# bundle exec rake db:seed 
