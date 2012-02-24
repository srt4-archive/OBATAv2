if (navigator.geolocation)  {
navigator.geolocation.getCurrentPosition(success, error);
} 

function success(position) {
	console.log(position);
	$(".notice")
		.text("You appear to be located at: " 
		+ position.coords.latitude + ", " 
		+ position.coords.longitude);

}

function error(msg) { }