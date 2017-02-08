require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :encrypted_password }
  end

  describe "associtions" do
    it 'has many trips' do
      should have_many(:trips)
    end

    it 'has many ratings' do
      should have_many(:trip_ratings)
    end
  end
end
