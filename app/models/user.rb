class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :trips
  has_many :badges_users
  has_many :badges, :through => :badges_users
  has_many :trip_ratings

  validates_presence_of :username, :email, :encrypted_password
end
