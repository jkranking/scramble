Rails.application.routes.draw do
  resources :trips, only: [:new, :show, :index, :create]
  get '/get_pings' => 'trips#get_pings'
end
