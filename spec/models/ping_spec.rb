require 'rails_helper'

RSpec.describe Ping, type: :model do
  it { is_expected.to validate_presence_of :lat }
  it { is_expected.to validate_presence_of :long }
  it { is_expected.to validate_presence_of :trip_id }
end
