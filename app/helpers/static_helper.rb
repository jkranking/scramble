module StaticHelper
  def static_path(trip)
    path = []
    trip.pings.each do |ping|
      path << "#{ping.lat},#{ping.long}"
    end
    path = path.join('|')
  end
end
