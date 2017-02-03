# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170203025807) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pings", force: :cascade do |t|
    t.decimal  "lat",        null: false
    t.decimal  "long",       null: false
    t.integer  "trip_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trip_id"], name: "index_pings_on_trip_id", using: :btree
  end

  create_table "trips", force: :cascade do |t|
    t.decimal  "latitude",                              null: false
    t.decimal  "longitude",                             null: false
    t.integer  "zoom",                                  null: false
    t.integer  "user_id"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "name",       default: "BEST TRIP EVER"
  end

end
