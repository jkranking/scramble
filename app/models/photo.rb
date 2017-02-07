ActiveRecord::Base.belongs_to_required_by_default = false

class Photo < ApplicationRecord
  belongs_to :marker

  has_attached_file :image,
                    styles: { thumb: ["64x64#", :jpg],
                              original: ['500x500>', :jpg] },
                    convert_options: { thumb: "-quality 75 -strip",
                                       original: "-quality 85 -strip" }

  validates_attachment :image,
                       content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
 validates_presence_of :image

  def image_url
    image.try(:url)
  end
end
