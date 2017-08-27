FactoryGirl.define do
  factory :place do
    title Faker::Name.title
    continent "Asia"
    country Faker::Address.country
    city Faker::Address.city
  end
end
