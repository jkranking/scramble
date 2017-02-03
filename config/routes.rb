Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  root 'trips#index'
  get '/', to: 'trips#index'
end
