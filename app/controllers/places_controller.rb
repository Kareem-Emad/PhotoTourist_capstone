class PlacesController < ApplicationController
  before_action :set_place, only: [:show, :update, :destroy]
  wrap_parameters :place, include: [:title,:continent,:country,:city]
  after_action :verify_authorized

  # GET /places
  # GET /places.json
  def index
    authorize Place

    @places =policy_scope( Place.all )
    @places = PlacePolicy.merge(@places)
    render json: @places
  end

  # GET /places/1
  # GET /places/1.json
  def show
    authorize @place
    places = policy_scope(Place.where(:id=>@place.id))
    @place = PlacePolicy.merge(places).first
    render json: @place
  end

  # POST /places
  # POST /places.json
  def create
    authorize Place
    @place = Place.new(place_params)
    @place.creator_id=current_user.id
    if @place.save
      render json: @place, status: :created, location: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /places/1
  # PATCH/PUT /places/1.json
  def update
    authorize @place
    if @place.update(place_params)
      head :no_content
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # DELETE /places/1
  # DELETE /places/1.json
  def destroy
    authorize @place
    @place.destroy

    head :no_content
  end

  private

    def set_place
      @place = Place.find(params[:id])
    end

    def place_params
      params.require(:place).permit(:title,:continent,:country,:city)
    end
end
