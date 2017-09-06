class TagsController < ApplicationController
  before_action :set_tag, only: [:show, :update, :destroy]
  wrap_parameters :tag, include: ["title"]
  # GET /tags
  # GET /tags.json
  def index
    @tags = Tag.all

    render json: @tags
  end

  # GET /tags/1
  # GET /tags/1.json
  def show
    render json: @tag
  end

  # POST /tags
  # POST /tags.json
  def create
    @tag=Tag.where(:title=>tag_params[:title])

    if !@tag.empty?
      @tag=@tag.first
      render json: @tag, status: :created, location: @tag
      return
    end

    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag, status: :created, location: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1
  # PATCH/PUT /tags/1.json
  def update
    if @tag.update(tag_params)
      #if tag_params[:thing_id]
        #@tag.things << Thing.find(:thing_id)
      #end
      head :no_content
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1
  # DELETE /tags/1.json
  def destroy
    @tag.destroy

    head :no_content
  end

  private

    def set_tag
      @tag = Tag.find(params[:id])
    end

    def tag_params
      params.require(:tag).permit(:title)
    end
end
