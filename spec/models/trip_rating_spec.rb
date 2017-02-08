require 'rails_helper'

RSpec.describe TripRating, type: :model do
  describe 'validations' do

    it { is_expected.to validate_presence_of :trip_id }
    it { is_expected.to validate_presence_of :user_id }
    it { is_expected.to validate_presence_of :rating }
  end

  describe 'associations' do
    it { is_expected.to belong_to :trip }
    it { is_expected.to belong_to :user }
  end

end
