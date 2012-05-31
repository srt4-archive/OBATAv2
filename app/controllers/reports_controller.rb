class ReportsController < ApplicationController
  # GET /reports
  # GET /reports.json
  def index
    id = 1
    if (id.nil?)
      @reports = Report.all(:order=>"id desc")
    end

    if (id == 1) # sort by votes
      @reports = Report.all()
      @reports.each do |r|
          puts r.votes
      end
      @new_var = []

      max_val = 0
      @reports.each do |re|
         if re.votes.count > 10
           re = nil
         end
      end
    end

    @reports = Report.all(:order=>"id desc")
	  @vote = Vote.new(params[:vote])


    if mobile_device?
      respond_to do |format|
        format.html {
          render :layout => "mobile"
        }
      end
      return
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @reports }
    end
  end

  # GET /reports/1
  # GET /reports/1.json
  def show
    @report = Report.find(params[:id])
    @vote = Vote.new(params[:vote])
   
    if user_signed_in? 
    @comment = current_user.comments.new(
    	:user => current_user,
    	:report_id => @report.id,
    )
    else
    @comment = Comment.new( :report_id => @report.id )
    end
    	
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @report }
    end
  end

  # GET /reports/new
  # GET /reports/new.json
  def new
    @report = Report.new
    if mobile_device?
      respond_to do |format|
        format.html {
          render :layout => "mobile"
        }
      end
      return
    end
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @report }
    end
  end

  # GET /reports/1/edit
  def edit
    @report = Report.find(params[:id])
  end

  # POST /reports
  # POST /reports.json
  def create
    @report = Report.new(
    	:route => params[:report][:route],
    	:stop => params[:report][:stop],
    	:body => params[:report][:body],
    	:title => params[:report][:title],
      :lat => params[:report][:lat],
      :lon => params[:report][:lon],
    	:user => current_user
    )

    respond_to do |format|
      if @report.save
        format.html { redirect_to @report, notice: 'Report was successfully created.' }
        format.json { render json: @report, status: :created, location: @report }
      else
        format.html { render action: "new" }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /reports/1
  # PUT /reports/1.json
  def update
    @report = Report.find(params[:id])

    respond_to do |format|
      if @report.update_attributes(params[:report])
        format.html { redirect_to @report, notice: 'Report was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @report.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reports/1
  # DELETE /reports/1.json
  def destroy
    @report = Report.find(params[:id])
    @report.destroy

    respond_to do |format|
      format.html { redirect_to reports_url }
      format.json { head :no_content }
    end
  end
end
