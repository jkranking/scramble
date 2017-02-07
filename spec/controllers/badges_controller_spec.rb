require 'rails_helper'

describe BadgesController do
  describe "#index" do
    it 'responds with a status of 200' do
      get :index
      expect(response).to have_http_status 200
    end

    it 'renders the :index template' do
      get :index
      expect(response).to render_template('index')
    end

    it 'assigns the badges as @badges' do
      get :index
      expect(assigns(:badges)).to eq(Badge.all)
    end
  end
end
