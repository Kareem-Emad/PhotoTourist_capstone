Rails.application.routes.draw do
	scope :api ,defaults: {format: :json} do
	  resources :cities 
	  resources :states ,only: [:index, :new, :create ,:show, :update]
	end
	get '/' => 'cover#index'
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
