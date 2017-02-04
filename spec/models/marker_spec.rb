require 'rails_helper'

RSpec.describe Marker, type: :model do
  it { is_expected.to validate_presence_of :lat }
  it { is_expected.to validate_presence_of :lng }
  it { is_expected.to validate_presence_of :trip_id }

  it { is_expected.to belong_to :trip }

end
