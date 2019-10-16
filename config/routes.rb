Rails.application.routes.draw do
  get 'pages/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :articles
  end

  put 'api/cells/:id', to: 'api/cells#update_one'
  put 'api/save/board', to: 'api/cells#update_all'
  get 'api/load/board', to: 'api/cells#load'


  root to: 'pages#index'
end
