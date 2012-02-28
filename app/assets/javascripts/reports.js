
$(document).ready(function() {
	if (navigator.geolocation)  {
	navigator.geolocation.getCurrentPosition(success, error);
	} 
	
	function success(position) {
		console.log(position);
		$(".notice")
			.text("You appear to be located at: " 
			+ position.coords.latitude + ", " 
			+ position.coords.longitude);
        $.latitude = position.coords.latitude;
        $.longitude = position.coords.longitude;

        // TODO: factor this into a different file
        try {
            showDistances();
            loadStops();
        }
        catch(e) {

        }
	}

	function error(msg) {

		$(".notice")
			.text("Error" + msg );
	}

});