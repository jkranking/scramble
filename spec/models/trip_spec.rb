require 'rails_helper'

RSpec.describe Trip, type: :model do
  it { is_expected.to validate_presence_of :zoom }
  it { is_expected.to validate_presence_of :latitude }
  it { is_expected.to validate_presence_of :longitude }
  it { is_expected.to validate_presence_of :user_id }
  it { is_expected.to validate_numericality_of :zoom }
  it { is_expected.to validate_numericality_of :latitude }
  it { is_expected.to validate_numericality_of :longitude }
  it { is_expected.to validate_numericality_of :user_id }
end
