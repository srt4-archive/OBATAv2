$(document).ready(function() {
    $("#page1").show();

    $(document).on("click", ".categories li",  function() {
        $(".categories li").removeClass("active");
        $(this).addClass("active");
    });

    $("#page1 .categories li").click(function() {
        $("#report_title").attr("value", $(this).text());
    });

    $("#page3 .categories li").live("click", function() {

    });

    $(".next").click(function() {
        var $par = $(this).parents(".page");
        $par.hide().next().show();
    });

    $("#page2 #find-near").click(function() {
        $("#stop-finder").show();
    });

    var $routesUl = $("#page3 .categories");

    // Using .one() so that the event is called once and removed
    //$("#find-near").one("click", function() {

});

var submitModel = {
    category: null,
    stopID: null,
    stopLat: null,
    stopLon: null,
    routeID: null,
    description: null
};


var routeList = [];


/**
 * Rewrites "A SENTENCE SUCH as this one" into "A Sentence Such As This One"
 * @param strSentence
 * @returns A properly capitalized sentence.
 */
function wordToUpper(strSentence) {
    strSentence = strSentence.toLowerCase().replace(/\b[a-z]/g, convertToUpper);
    strSentence = strSentence
        .replace("Ne ", "NE ")
        .replace("Se ", "SE ")
        .replace("Nw ", "NW ")
        .replace("Sw ", "SW ")
        .replace(" Ne", " NE")
        .replace(" Se", " SE")
        .replace(" Nw", " NW")
        .replace(" Sw", " SW");
    return strSentence;
    function convertToUpper() {
        if (arguments == "NE")
            return arguments;
        return arguments[0].toUpperCase();
    }
}

/**
 * Compares two stops based on distance from user
 * and number of routes which stop there.
 * @param stopA
 * @param stopB
 * @returns The difference in distance and number of routes between two stops.
 */
function sortStops(stopA, stopB) {
    // assume that the difference in distances will be ~0.05 miles
    var distDiff = 120 * (stopDistance(stopA) - stopDistance(stopB));

    // assume that the number of routes at a stop will vary between 1 and 10
    var routeDiff = stopB.routes.length - stopA.routes.length;

    return distDiff + routeDiff;
}

/**
 * Calculates the distance from the current user to the specified stop.
 * @param stop
 * @returns Distance the stop is from the user.
 */
function stopDistance(stop) {
    return Math.round(
        distanceBetween(
            $.latitude,
            $.longitude,
            stop.lat,
            stop.lon
        ) * 100 ) / 100;
}

/**
 * Helper method to update the hidden fields in a form, every time the
 * next button is clicked
 */
function updateForms() {

}


/**
 * Loads stops into the list, using the OBA api
 */
function loadStops(lat, lon) {
    var $loadingImg = $(this).children(".loading"); // TODO: replace this with class/ID search
    $loadingImg.show();
    console.log("Test");

    //var url = "http://api.onebusaway.org/api/where/schedule-for-stop/1_" + $("#stopid").attr('value') + ".json?key=TEST";
    var url = "http://api.onebusaway.org/api/where/stops-for-location.json";

    var data = {
        key: "TEST",
        lat: lat,
        lon: lon,
        radius: 600
    };

    $.ajax({
        url: url,
        data: data,
        dataType: "jsonp",
        success: function(result) {
            $loadingImg.hide();

            // sort the stops
            result.data.stops.sort(sortStops);

            $.leafletStopsLayer.clearLayers();

            $.each(result.data.stops, function(key, value) {

                var marker = new L.Marker(
                    new L.LatLng(value.lat, value.lon),
                    {
                        icon: busIcon,
                    }
                ).on("click", function() {
                    // populate the form with stop ID
                    console.log(value.id);
                    $("#report_stop").attr("value", value.id);
                });

                $.leafletStopsLayer.addLayer(marker);

                var distance = stopDistance(value);

                var $li = $("<li>")
                    .text(distance + " miles ( " + value.routes.length + " routes ) - "  + wordToUpper(value.name))
                    .css("color", "black")
                    .css("list-style", "none")
                    .click(function() {
                        $("#report_stop").attr("value", value.id);
                        $("#report_lat").attr("value", value.lat);
                        $("#report_lon").attr("value", value.lon);

                        routeList = value.routes;
                        $.each(routeList, function(key, stopRoutes) {
                            // find whether route long name or route desc is longer, pick it
                            var longName = stopRoutes.longName.length > stopRoutes.description?
                                stopRoutes.longName :
                                stopRoutes.description;
                            $routesUl.append(
                                $("<li/>")
                                    .text(
                                    wordToUpper(stopRoutes.shortName + " - " + longName)
                                )
                                    .click(function() {
                                        console.log($("#report_route"));
                                        $("#report_route").attr("value", stopRoutes.id);
                                    })
                            );
                        });
                    });
                $("#stops-near").append(
                    $li
                );
            });
        }
    });
}