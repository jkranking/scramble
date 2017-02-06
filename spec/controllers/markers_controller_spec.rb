require 'rails_helper'

RSpec.describe MarkersController, type: :controller do
  describe "#create" do
    before :each do
      @user = create(:user)
      sign_in(@user)
      @attributes = attributes_for(trip.marker)
      @attributes[:user_id] = @user.id
    end

    # let (:pings) { {"0"=>{"lat"=>"65.90165338613072", "lng"=>"-95.526123046875"}, "1"=>{"lat"=>"65.87472467098549", "lng"=>"-94.647216796875"}, "2"=>{"lat"=>"65.82078234733756", "lng"=>"-93.680419921875"}, "3"=>{"lat"=>"65.54936668811528", "lng"=>"-93.746337890625"}, "4"=>{"lat"=>"65.63109034100295", "lng"=>"-95.877685546875"}, "5"=>{"lat"=>"64.46332329319623", "lng"=>"-96.251220703125"}} }


    # validates_presence_of :lat, :lng, :trip_id, :note
    let(:trip) {}
    let(:marker) {create(:marker)}

    it 'responds with a status of 403 if user not logged in' do
      sign_out(@user)
      post :create, params: {marker: @attributes}, format: :json
      expect(response).to have_http_status 403
    end

    xit 'creates a trip' do
      expect{post :create, params: {trip: @attributes, pings: pings}, format: :json}.to change{Trip.count}.from(0).to(1)
    end

    xit '#get_pings' do
      post :create, params: {trip: @attributes, pings: pings}, format: :json
      get :get_pings, params: { id: Trip.last.id }
      expect(response.body).to include "65.90165338613072"
    end
  end
end
