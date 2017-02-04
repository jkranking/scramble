module StaticHelper
  def static_path(trip)
    path = []
    trip.pings.each do |ping|
      path << "#{ping.lat},#{ping.lng}"
    end
    path = path.join('|')
  end
end
