require 'rails_helper'
include Warden::Test::Helpers

feature 'visiting the homepage' do
  scenario 'the visitor sees a list of trips and can view them', js: true do
    trip = FactoryGirl.create(:trip)
    visit root_path
    within('.index-list') do
      expect(page).to have_content trip.name
      click_link(trip.name)
    end
    expect(page).to have_current_path trip_path(trip)
  end

  scenario 'the visitor can go to the login page' do
    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "Login"
      click_link("Login")
    end
    expect(page).to have_current_path new_user_session_path
  end

  scenario 'the visitor can go to the sign up page' do
    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "Sign up"
      click_link("Sign up")
    end
    expect(page).to have_current_path new_user_registration_path
  end

  scenario 'the visitor can click the home page button' do
    visit root_path
    within('.navbar-left') do
      expect(page).to have_content "Scramble"
      click_link("Scramble")
    end
    expect(page).to have_current_path trips_path
  end

  scenario 'if logged in, the user can logout' do
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user)

    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "Logout"
      click_link("Logout")
    end
    expect(page).to have_current_path "/"
  end

  scenario 'if logged in, the user can create a new trip' do
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user)

    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "Logout"
      click_link("Logout")
    end
    expect(page).to have_current_path "/"
  end

  scenario 'if logged in, the user can view their profile' do
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user)

    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "Profile"
      click_link("Profile")
    end
    expect(page).to have_current_path user_path(user)
  end

  scenario 'if logged in, the user can view their trips' do
    user = FactoryGirl.create(:user)
    login_as(user, :scope => :user)

    visit root_path
    within('.navbar-right') do
      expect(page).to have_content "My Trips"
      click_link("My Trips")
    end
    expect(page).to have_current_path user_trips_path(user)
  end

end
