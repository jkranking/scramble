require 'rails_helper'

describe TripsController do
  describe "#index" do
    it 'responds with a status of 200' do
      get :index
      expect(response).to have_http_status 200
    end

    it 'renders the :index template' do
      get :index
      expect(response).to render_template('index')
    end

    it 'assigns the trips as @trips' do
      get :index
      expect(assigns(:trips)).to eq(Trip.all)
    end
  end

    describe "#new" do
    it 'responds with a status of 200' do
      get :new
      expect(response).to have_http_status 200
    end

    it 'renders the :new template' do
      get :new
      expect(response).to render_template('new')
    end

    it 'assigns the trips as @trip' do
      get :new
      expect(assigns(:trip)).to be_a_new Trip
    end
  end

  describe "#show" do

    let(:trip) { create(:trip) }

    it 'responds with a status of 200' do
      get :show, params: {id: trip.id}
      expect(response).to have_http_status 200
    end

    it 'renders the :show template' do
      get :show, params: {id: trip.id}
      expect(response).to render_template('show')
    end

    it 'assigns the trips as @trips' do
      get :show, params: {id: trip.id}
      expect(assigns(:trip)).to eq(trip)
    end
  end

  describe "#create" do
    before :each do
      @user = create(:user)
      sign_in(@user)
      @attributes = attributes_for(:trip)
      @attributes[:user_id] = @user.id
    end

    let (:pings) { {"0"=>{"lat"=>"65.90165338613072", "lng"=>"-95.526123046875"}, "1"=>{"lat"=>"65.87472467098549", "lng"=>"-94.647216796875"}, "2"=>{"lat"=>"65.82078234733756", "lng"=>"-93.680419921875"}, "3"=>{"lat"=>"65.54936668811528", "lng"=>"-93.746337890625"}, "4"=>{"lat"=>"65.63109034100295", "lng"=>"-95.877685546875"}, "5"=>{"lat"=>"64.46332329319623", "lng"=>"-96.251220703125"}} }

    it 'responds with a status of 403 if user not logged in' do
      sign_out(@user)
      post :create, params: {trip: @attributes, pings: pings}, format: :json
      expect(response).to have_http_status 403
    end

    it 'creates a trip' do
      expect{post :create, params: {trip: @attributes, pings: pings}, format: :json}.to change{Trip.count}.from(0).to(1)
    end

    it '#get_pings' do
      post :create, params: {trip: @attributes, pings: pings}, format: :json
      get :get_pings, params: { id: Trip.last.id }
      expect(response.body).to include "65.90165338613072"
    end
  end
end
