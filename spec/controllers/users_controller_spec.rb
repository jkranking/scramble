require 'rails_helper'

RSpec.describe Users::UsersController, type: :controller do

  it "should have a current_user" do
    user = FactoryGirl.create(:user)
    sign_in user
    expect(subject.current_user).to_not eq(nil)
  end

  describe "#show" do
    let(:user) { create(:user) }
    it 'responds with a status of 200' do
      get :show, params: {id: user.id}
      expect(response).to have_http_status 200
    end

    it 'renders the :show template' do
      get :show, params: {id: user.id}
      expect(response).to render_template("users/show.html.erb")
    end

    it 'assigns the user as @user' do
      get :show, params: {id: user.id}
      expect(assigns(:user)).to eq(user)
    end
  end

  describe "#trips_index" do
    let(:user) { create(:user) }
    let(:trip) { create(:trip) }
    it 'responds with a status of 200' do
      get :trips_index, params: {id: user.id}
      expect(response).to have_http_status 200
    end

    it 'renders the :trips_index template' do
      get :trips_index, params: {id: user.id}
      expect(response).to render_template("users/trips_index.html.erb")
    end

    it 'assigns the users trips as @trips' do
      get :trips_index, params: {id: user.id}
      expect(assigns(:trip)).to eq(user.trips)
    end
  end
end

# def trips_index
#     user = User.find(params[:user_id])
#     @trips = user.trips
#     render '/users/trips_index.html.erb'
#   end

