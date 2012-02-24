class VerificationsController < ApplicationController
  # GET /verifications
  # GET /verifications.json
  def index
    @verifications = Verification.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @verifications }
    end
  end

  # GET /verifications/1
  # GET /verifications/1.json
  def show
    @verification = Verification.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @verification }
    end
  end

  # GET /verifications/new
  # GET /verifications/new.json
  def new
    @verification = Verification.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @verification }
    end
  end

  # GET /verifications/1/edit
  def edit
    @verification = Verification.find(params[:id])
  end

  # POST /verifications
  # POST /verifications.json
  def create
  	if current_user.transam?
   	 	@verification = Verification.new(params[:verification])
	
		respond_to do |format|
		  if @verification.save
			format.html { redirect_to @verification, notice: 'Verification was successfully created.' }
			format.json { render json: @verification, status: :created, location: @verification }
		  else
			format.html { render action: "new" }
			format.json { render json: @verification.errors, status: :unprocessable_entity }
		  end
		end
    end
  end

  # PUT /verifications/1
  # PUT /verifications/1.json
  def update
	
		@verification = Verification.find(params[:id])
	
		respond_to do |format|
		  if @verification.update_attributes(params[:verification])
			format.html { redirect_to @verification, notice: 'Verification was successfully updated.' }
			format.json { head :no_content }
		  else
			format.html { render action: "edit" }
			format.json { render json: @verification.errors, status: :unprocessable_entity }
		  end
		end
	
  end

  # DELETE /verifications/1
  # DELETE /verifications/1.json
  def destroy
    @verification = Verification.find(params[:id])
    @verification.destroy

    respond_to do |format|
      format.html { redirect_to verifications_url }
      format.json { head :no_content }
    end
  end
end
