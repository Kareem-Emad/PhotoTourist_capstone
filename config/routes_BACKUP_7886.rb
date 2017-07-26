Rails.application.routes.draw do
<<<<<<< HEAD
	scope :api ,defaults: {format: :json} do
	  resources :cities ,only: [:index, :new, :create ,:show, :update]
	  resources :states ,only: [:index, :new, :create ,:show, :update]
	end
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
=======
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => 'cover#index'

>>>>>>> master
end
