/**
 * Created by JetBrains RubyMine.
 * User: spencer
 * Date: 2/26/12
 * Time: 2:45 PM
 * To change this template use File | Settings | File Templates.
 */

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two ZIP Codes or Postal Codes using our           :::
//:::  ZIPCodeWorld(TM) and PostalCodeWorld(TM) products.                     :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  United States ZIP Code/ Canadian Postal Code databases with latitude   :::
//:::  & longitude are available at http://www.zipcodeworld.com               :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@zipcodeworld.com                   :::
//:::                                                                         :::
//:::  Official Web site: http://www.zipcodeworld.com                         :::
//:::                                                                         :::
//:::  Hexa Software Development Center © All Rights Reserved 2004            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

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