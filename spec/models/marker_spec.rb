require 'rails_helper'

RSpec.describe Marker, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of :lat }
    it { is_expected.to validate_presence_of :lng }
    it { is_expected.to validate_presence_of :trip_id }
    it { is_expected.to validate_numericality_of :lat }
    it { is_expected.to validate_numericality_of :lng }
    it { is_expected.to allow_value(-1).for :lat }
    it { is_expected.to allow_value(-1).for :lng }
  end

  describe 'associations' do
    it { is_expected.to belong_to :trip }
  end
end
