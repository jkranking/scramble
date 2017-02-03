FactoryGirl.define do
  factory :user do
    username "Jeff"
    email { Faker::Internet.email }
    password "Kranking"
  end
end
