require 'rails_helper'

RSpec.describe "Routing to trips", type: :routing do
  it 'routes get / to trips#index' do
    expect(get: "/").to route_to("trips#index")
  end
  it 'routes post /trips to trips#create' do
    expect(post: "/trips").to route_to("trips#create")
  end

  it 'routes get /trips/new to trips#new' do
    expect(get: "/trips/new").to route_to("trips#new")
  end

  it 'routes get /trips/1 to trips#show' do
    expect(get: "/trips/1").to route_to("trips#show", id: "1")
  end
end
