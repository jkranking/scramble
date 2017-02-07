require 'rails_helper'

RSpec.describe Badge, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of :description }
    it { is_expected.to validate_presence_of :image_id }
    it { is_expected.to validate_numericality_of :image_id }

  end

  describe 'associations' do
    it { is_expected.to have_many :badges_users }
  end
end
