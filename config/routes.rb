Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  mount MagicLamp::Genie, at: "/magic_lamp" if defined?(MagicLamp)

  resources :trips do
    resources :markers, only: [:create, :update, :destroy]
  end

  get '/users/:user_id/trips', to: 'trips#user_trips_index', as: 'user_trips'

  get '/get_pings' => 'trips#get_pings', defaults: { format: 'json' }

  devise_for :users, controllers: { registrations: 'users/registrations' }

  get '/users/:id', to: 'users/users#show', as: 'user'
  # get '/users/:user_id/trips', to: 'users/users#trips_index', as: 'user_trips'

  root 'trips#index'


end
