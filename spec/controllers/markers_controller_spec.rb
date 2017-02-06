require 'rails_helper'

describe MarkersController do
  before :each do
    @user = create(:user)
    @trip = create(:trip, user_id: @user.id)
    @attributes = attributes_for(:marker)
  end

  describe "#create" do

    it 'responds with a status of 401 if user not logged in' do
      post :create, params: {marker: @attributes, trip_id: @trip.id}, format: :json
      expect(response).to have_http_status 401
    end

    it 'creates a marker when given proper params' do
      sign_in(@user)
      expect{post :create, params: {marker: @attributes, trip_id: @trip.id}, format: :json}.to change{Marker.count}.from(0).to(1)
    end
  end

  describe "#update" do

    it 'responds with a status of 401 if user is not the trip owner' do
      @marker = create(:marker, trip_id: @trip.id)
      put :update, params: {marker: @attributes, id: @marker.id, trip_id: @trip.id}, format: :json
      expect(response).to have_http_status 401
    end

    it 'updates a trip when given proper params and user is the trip owner' do
      sign_in(@user)
      @marker = create(:marker, trip_id: @trip.id)
      @attributes["note"] = "WORST TRIP NEVER"
      put :update, params: {marker: @attributes, id: @marker.id, trip_id: @trip.id}, format: :json
      expect(Marker.find(@marker.id).note).to eq ("WORST TRIP NEVER")
    end
  end

  describe "#destroy" do

    it 'responds with a status of 401 if user is not the trip owner' do
      @marker = create(:marker, trip_id: @trip.id)
      delete :destroy, params: {marker: @attributes, id: @marker.id, trip_id: @trip.id}, format: :json
      expect(response).to have_http_status 401
    end

    it 'destroys a trip when given proper params and user is the trip owner' do
      sign_in(@user)
      @marker = create(:marker, trip_id: @trip.id)
      @attributes["note"] = "WORST TRIP NEVER"
      delete :destroy, params: {marker: @attributes, id: @marker.id, trip_id: @trip.id}, format: :json
      expect(Marker.find_by_id(@marker.id)).to be_nil
    end
  end
end
