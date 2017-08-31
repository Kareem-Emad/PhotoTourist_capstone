FactoryGirl.define do
  factory :place do
    title {Faker::Name.title}
    continent { ["Asia","Africa","Europe","Australia","America"].sample }
    country {Faker::Address.country}
    city {Faker::Address.city}
    creator_id { [1,2,3,4,5,6,7,8,9,10].sample }
  end
end
