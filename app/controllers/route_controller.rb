class RouteController < ApplicationController
  # GET /reports/1
  # GET /reports/1.json
  def show
    require('nokogiri')
    require('open-uri')
    require('date')

    yesterday = 1.day.ago
    last_alert = Alert.find(:last).updated_at

    result_array = Array.new

    if yesterday > last_alert
      doc = Nokogiri::HTML(open('http://metro.kingcounty.gov/up/rr/reroutes.html'))

      #resultArray = Array.new

      doc.css('#service > tr').each do |tr|
        trArray = tr.css("td")
        service = trArray[0].content
        route = trArray[1].content
        details = trArray[2].content
        startDate = trArray[3].content
        endDate = trArray[4].content

        agency = Agency.find_or_create_by_name(service)

        route  = Route.find_or_create_by_number(route)
        route.agency = agency
        route.save!

        alert = Alert.find_or_create_by_agency_id_and_route_id_and_details_and_start_and_end(
            agency.id,
            route.id,
            details,
            Date.strptime(startDate, "%m/%d/%y"),
            Date.strptime(endDate, "%m/%d/%y")
        )
      end
    end

    # TODO: Alert.all becomes Alert.where("endDate > currentDate")

    respond_to do |format|
      format.html { render xml: open("http://google.com") }
      format.json { render json: Alert.all }
    end

  end
end