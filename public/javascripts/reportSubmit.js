$(document).ready(function() {
    $("#page1").show();

    $(".categories li").bind("tap",  function() {
        //$(".categories li").removeClass("active");
        //$(this).addClass("active");
        $(this).css("background", "orange");
    });

    $(".categories li").bind("click", function(event) {
        window.setTimeout(function(){
            map.invalidateSize();
            console.log("Trying to load stops");
            loadStops($.latitude, $.longitude);

            console.log("Loading stops part two");
        }, 1000);

        $(this).css("background", "orange");
        var $par = $(this).parents(".page");
        $par.hide().next().show();
        history.pushState("/#!/selectRoute");
    });

    $("#page1 .categories li").click(function() {
        $("#report_title").attr("value", $(this).text());
    });

    $("#page3 .categories li").live("click", function() {
              advancePage(this);
    });

    $(".next").click(advancePage);

    $("#page2 #find-near").click(function() {
        $("#stop-finder").show();
    });

    var $routesUl = $("#page3 .categories");

    // Using .one() so that the event is called once and removed
    //$("#find-near").one("click", function() {

});

function advancePage(elem) {
    var $par = $(elem).parents(".page");
    $par.hide().next().show();
}


function finishPageTwo() {
    advancePage($("#page2 div"));
    $.each(routeList, function(key, route) {
        var routeDesc =
            route.longName.length > route.description.length ?
                route.longName :
                route.description;

        var $routeElem = $("<li/>").text(route.shortName + " - " + wordToUpper(routeDesc));

        $routeElem.click(function() {
            console.log($("#report_route"));
            $(this).css("background", "orange");

            $("#report_route").attr("value", route.shortName);
        });

        $("#page3 .routes").append(
            $routeElem
        );
        var $detailElem = $("<div/>").css({
            "color": "red",
            "font-size": "12px",
            "padding-left": "10px"
        });

        $routeElem.append($detailElem);

        getServiceAlerts(route.shortName, $detailElem);
    });
}

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

    var replaceArray = [ "Ne", "Nw", "Se", "Sw" ];
    for(token in replaceArray) {
        strSentence = strSentence
            .replace(" " + token, " " + token.toUpperCase())
            .replace(token + " ", token.toUpperCase() + " ");

    }
    return strSentence;
    function convertToUpper() {
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
        ) * 100
    ) / 100;
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
    console.log("Called with " + lat + ", " + lon);

    var $loadingImg = $(this).children(".loading"); // TODO: replace this with class/ID search
    $loadingImg.show();

    var url = "http://api.onebusaway.org/api/where/stops-for-location.json";

    var data = {
        key: "TEST",
        lat: lat,
        lon: lon,
        radius: 1000
    };

    $.ajax({
        url: url,
        data: data,
        dataType: "jsonp",
        success: function(result) {
            $loadingImg.hide();

            result.data.stops.sort(sortStops);

            $.leafletStopsLayer.clearLayers();

            $.each(result.data.stops, function(key, value) {
                                               console.log(value);
                var marker = new L.Marker(
                    new L.LatLng(value.lat, value.lon),
                    {
                        icon: busIcon
                    }
                ).on("click", function() {
                    // populate the form with stop ID
                    $("#report_stop").attr("value", value.id);
                    marker.bindPopup("<b>Stop:</b><br/> " + value.code + "<br /> <b>Routes:</b> <br /> " + (function() {
                        var s = "";
                        $.each(value.routes, function(key, v) {
                           s += (v.shortName + "<br />");
                            console.log(key);
                           if (key > 2) {
                               s += "And " + (value.routes.length - key) + " more...";
                               return false;
                           }
                        });
                        return s.toString();
                    })()
                    + " <br /><a style='font-size:18px' href='#' onclick='finishPageTwo()'>Select Stop ></a>"
                    ).openPopup();
                    routeList = value.routes;
                });

               map.addLayer(marker);
            });
        }
    });
}

/**
 * Fetches service alerts, accepts a callback function
 */
function getServiceAlerts(route, elem) {
      $.getJSON("/routes/" + route + "/alerts.json", function(data) {
          $.each(data, function(key, alert){
              console.log(alert);
              elem.text("Until " + alert.end + ": " + alert.details);
          });
      });
}

/**
 *
 */
function serviceAlertCallback() {

}


/**
 * Created by JetBrains RubyMine.
 * User: spencer
 * Date: 2/26/12
 * Time: 2:45 PM
 * To change this template use File | Settings | File Templates.
 */
function distanceBetween(lat1, lon1, lat2, lon2) {
    unit = "M";
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var radlon1 = Math.PI * lon1/180;
    var radlon2 = Math.PI * lon2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344; }
    if (unit=="N") { dist = dist * 0.8684; }
    return dist;
}