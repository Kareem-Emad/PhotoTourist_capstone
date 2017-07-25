json.extract! state, :id, :name, :created_at, :updated_at
json.id state.id.to_s
json.url state_url(state, format: :json)
