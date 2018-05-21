/* jshint esversion: 6*/
let RouteInfo = require("./RouteInfo.js").RouteInfo;

function RouteInfoProvider(routeInfo) {

    if (! (routeInfo instanceof RouteInfo)) {
        throw "RouteInfoProvider only works with instances of RouteInfo";
    }
    this.RouteInfo = routeInfo;
    this.getDistance = function(stations) {
        const stationNames = stations.split("-");
        let totalDistance = 0;
        for (let stationIdx = 0; stationIdx < stationNames.length - 1; stationIdx++) {
            let originName = stationNames[stationIdx];
            let destinationName = stationNames[stationIdx + 1];

            if (!this.RouteInfo.isStation(originName)) {
                console.log("NO SUCH ROUTE");
                return;
            }
            let origin = this.RouteInfo.getStation(originName);
            let destination = this.RouteInfo.getStation(destinationName);
            totalDistance += origin.getDistanceTo(destination);
            if (isNaN(totalDistance)) {
                console.log("NO SUCH ROUTE");
                return;
            }
        }
        return totalDistance;
    };
}
module.exports.RouteInfoProvider = RouteInfoProvider;
