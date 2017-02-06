require 'rails_helper'
include Warden::Test::Helpers

feature 'visiting the trip show page' do
  scenario 'the visitor sees the trip name' do
    trip = FactoryGirl.create(:trip)
    visit trip_path(trip)
    expect(page).to have_content trip.name
  end
end
