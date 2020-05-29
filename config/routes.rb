Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "apps#race"

  get 'race', to: "apps#race"
  get 'puzzle', to: "apps#puzzle"
end
