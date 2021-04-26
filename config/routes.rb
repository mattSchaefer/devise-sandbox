Rails.application.routes.draw do
devise_for :users, controllers: {registrations: 'registrations', sessions: 'sessions'}
    root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    namespace :api do
        namespace :v1 do
            get 'users/index' => 'users_api_controller'
        end
    end
end
