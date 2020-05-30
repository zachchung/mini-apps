Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "apps#index"

  get 'race', to: "apps#race"
  get 'puzzle', to: "apps#puzzle"
  get 'geocode', to: "apps#geocode"
  get 'weather', to: "apps#weather"
  get 'minesweeper', to: "apps#minesweeper"

  get 'wordgame', to: 'games#new'
  post 'wordgame', to: 'games#score' # => same url but display diff (diplayed page determined by controller)
end
