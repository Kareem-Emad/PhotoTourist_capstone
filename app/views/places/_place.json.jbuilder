json.extract! place, :id, :title, :continent,:city,:country,:created_at, :updated_at
json.url place_url(place, format: :json)
json.user_roles place.user_roles unless place.user_roles.empty?