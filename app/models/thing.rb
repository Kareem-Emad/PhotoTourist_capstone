class Thing < ActiveRecord::Base
  include Protectable
  validates :name, :presence=>true

  has_and_belongs_to_many :tags
  
  has_many :thing_images, inverse_of: :thing, dependent: :destroy

  scope :not_linked, ->(image) { where.not(:id=>ThingImage.select(:thing_id)
                                                          .where(:image=>image)) }
end
