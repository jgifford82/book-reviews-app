Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
  resources :reviews, only: [:index]

  resources :books, only: [:index, :create, :show] do
    # nested resource for reviews
    resources :reviews, only: [:show, :index]
  end
  
  resources :users, only: [:index, :show]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  
end
