Rails.application.routes.draw do

  resources :trips, only: [:new, :show, :index, :create, :edit, :update] do
    resources :markers, only: [:create]
  end
  get '/get_pings' => 'trips#get_pings', defaults: { format: 'json' }

  devise_for :users, controllers: { registrations: 'users/registrations' }

  get '/users/:id', to: 'users/users#show', as: 'user'

  root 'trips#index'


end
