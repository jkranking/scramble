Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }

  get '/users/:id', to: 'users#show', as: 'user'

  root 'trips#index'

  resources :trips
end
