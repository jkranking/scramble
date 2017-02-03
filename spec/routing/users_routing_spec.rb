require 'rails_helper'

RSpec.describe "Routing to users", type: :routing do
  it 'routes get /users/sign_in to devise/sessions#new' do
    expect(get: "/users/sign_in").to route_to("devise/sessions#new")
  end

  it 'routes post /users/sign_in to devise/sessions#create' do
    expect(post: "/users/sign_in").to route_to("devise/sessions#create")
  end

  it 'routes delete /users/sign_out to devise/sessions#destroy' do
    expect(delete: "/users/sign_out").to route_to("devise/sessions#destroy")
  end





  it 'routes get /users/password/new to devise/passwords#new' do
    expect(get: "/users/password/new").to route_to("devise/passwords#new")
  end

  it 'routes get /users/password/edit to devise/passwords#edit' do
    expect(get: "/users/password/edit").to route_to("devise/passwords#edit")
  end

  it 'routes put /users/password to devise/passwords#update' do
    expect(put: "/users/password").to route_to("devise/passwords#update")
  end

  it 'routes post /users/password to devise/passwords#create' do
    expect(post: "/users/password").to route_to("devise/passwords#create")
  end



  it 'routes get /users/cancel to users/registrations#cancel' do
    expect(get: "/users/cancel").to route_to("users/registrations#cancel")
  end

  it 'routes get /users/sign_up to users/registrations#new' do
    expect(get: "/users/sign_up").to route_to("users/registrations#new")
  end

  it 'routes get /users/edit to users/registrations#edit' do
    expect(get: "/users/edit").to route_to("users/registrations#edit")
  end

  it 'routes put /users to users/registrations#update' do
    expect(put: "/users").to route_to("users/registrations#update")
  end

  it 'routes delete /users to users/registrations#destroy' do
    expect(delete: "/users").to route_to("users/registrations#destroy")
  end

  it 'routes post /users to users/registrations#create' do
    expect(post: "/users").to route_to("users/registrations#create")
  end

  it 'routes get /users/1 to users#show' do
    expect(get: "/users/1").to route_to("users/users#show", id:"1")
  end
end
