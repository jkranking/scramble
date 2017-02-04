require 'rails_helper'

RSpec.describe Ping, type: :model do
  it { is_expected.to validate_presence_of :lat }
  it { is_expected.to validate_presence_of :lng }
  it { is_expected.to validate_presence_of :trip_id }
  it { is_expected.to belong_to :trip }


  describe "#create_multiple_pings" do
    let (:pings) { {"0"=>{"lat"=>"65.90165338613072", "lng"=>"-95.526123046875"}, "1"=>{"lat"=>"65.87472467098549", "lng"=>"-94.647216796875"}, "2"=>{"lat"=>"65.82078234733756", "lng"=>"-93.680419921875"}, "3"=>{"lat"=>"65.54936668811528", "lng"=>"-93.746337890625"}, "4"=>{"lat"=>"65.63109034100295", "lng"=>"-95.877685546875"}, "5"=>{"lat"=>"64.46332329319623", "lng"=>"-96.251220703125"}} }
    let (:trip) { create(:trip) }

      it "can create multiple pings at once" do
        Ping.create_multiple_pings(trip, pings)
        expect(trip.pings.length).to eq(6)
      end
  end
end
