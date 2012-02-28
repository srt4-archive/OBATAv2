class RouteController < ApplicationController
  # GET /reports/1
  # GET /reports/1.json
  def show
    require('nokogiri')
    require('open-uri')

    doc = Nokogiri::HTML(open('http://metro.kingcounty.gov/up/rr/reroutes.html'))

    resultArray = Array.new

    doc.css('#service > tr').each do |tr|
      trArray = tr.css("td")
      service = trArray[0].content
      route = trArray[1].content
      details = trArray[2].content
      startDate = trArray[3].content
      endDate = trArray[4].content

      #if route == params[:id]
        resultArray.append ( {
            service: service,
            route: route,
            details: details,
            startDate: startDate,
            endDate: endDate
        })
      #end
    end

    respond_to do |format|
      format.html { render xml: open("http://google.com") }
      format.json { render json: resultArray }
    end

  end
end