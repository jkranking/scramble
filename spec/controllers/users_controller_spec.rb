require 'rails_helper'

RSpec.describe Users::UsersController, type: :controller do
  before(:each) do
    user = FactoryGirl.create(:user)
    sign_in user
  end

  it "should have a current_user" do
    expect(subject.current_user).to_not eq(nil)
  end

end
