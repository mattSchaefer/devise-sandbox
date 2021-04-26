class Api::V1::UsersController < ApplicationController
    def index
        user = User.all.order(created_at: :desc)
        render json: user
    end
    private

    
     def user
         @user ||= User.find(params[:email])
     end

end
