Rails.application.routes.draw do
  devise_for :users
  root 'trips#index'
  get '/', to: 'trips#index'
end
