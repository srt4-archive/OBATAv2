function showDistances() {
    $(".report").each(function() {
        var $distDiv = $(this).find(".distance-away");
        var dist =
            Math.round(distanceBetween(
                $.latitude,
                $.longitude,
                $(this).attr("data-lat"),
                $(this).attr("data-lon")
            ) * 100) / 100;
        dist = dist > 100 ?  "many" : dist;
        $distDiv.text(dist);
    });
}