Rails.application.routes.draw do
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :books, only: [:index, :create, :show] do
    # nested resource for reviews
    # omit the only option since all five RESTful routes are used
    resources :reviews
  end
  
  resources :users, only: [:index, :show]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  
end
