require 'rails_helper'

RSpec.describe "Routing to users", type: :routing do
  it 'routes get / to trips#index' do
    expect(get: "/").to route_to("trips#index")
  end
  it 'routes post /trips to trips#create' do
    expect(post: "/trips").to route_to("trips#create")
  end

  it 'routes get /trips/new to trips#new' do
    expect(get: "/trips/new").to route_to("trips#new")
  end

  it 'routes get /trips/1/edit to trips#edit' do
    expect(get: "/trips/1/edit").to route_to("trips#edit", id: "1")
  end

  it 'routes get /trips/1 to trips#show' do
    expect(get: "/trips/1").to route_to("trips#show", id: "1")
  end

  it 'routes put /trips/1 to trips#update' do
    expect(put: "/trips/1").to route_to("trips#update", id: "1")
  end

  it 'routes delete /trips/1 to trips#destroy' do
    expect(delete: "/trips/1").to route_to("trips#destroy", id: "1")
  end
end
