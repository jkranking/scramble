Rails.application.routes.draw do

  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  mount MagicLamp::Genie, at: "/magic_lamp" if defined?(MagicLamp)

  resources :photos, only: [:new, :create, :delete]

  resources :trips do
    resources :markers, only: [:create, :update, :destroy]
  end

  get '/users/:user_id/trips', to: 'trips#user_trips_index', as: 'user_trips'

  get '/get_pings' => 'trips#get_pings', defaults: { format: 'json' }

  devise_for :users, controllers: { registrations: 'users/registrations', :omniauth_callbacks => "users/omniauth_callbacks" }

  get '/users/:id', to: 'users/users#show', as: 'user'

  root 'trips#index'

  resources :badges, only: [:index]

end
