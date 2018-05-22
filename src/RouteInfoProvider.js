/* jshint esversion: 6*/
let RouteInfo = require("./RouteInfo.js").RouteInfo;
let Path = require("./Path.js").Path;

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
                return "NO SUCH ROUTE";
            }
            let origin = this.RouteInfo.getStation(originName);
            let destination = this.RouteInfo.getStation(destinationName);
            totalDistance += origin.getDistanceTo(destination);
            if (isNaN(totalDistance)) {
                return "NO SUCH ROUTE";
            }
        }
        return totalDistance;
    };

    this.findPaths = function(originName, destinationName, pathPredicate, continuationPredicate) {

        let originStation = this.RouteInfo.getStation(originName);

        let destinationStation = this.RouteInfo.getStation(destinationName);

        let paths = [];

        let nodeStack = [originStation];

        let currentPath = new Path(originStation);

        doDFSTraversal(originStation);

        function doDFSTraversal(stationNode) {
            let outboundRoutes = stationNode.OutboundConnections;

            for (let route of outboundRoutes) {
                currentPath.pushRoute(route);

                // IF we're at the destination, and pathPredicate is satisfied, get the station
                // list and put it onto the list of paths.
                // IF the continuationPredicate is satisfied, doDFSTraversal on destination of current outbound route
                // OTHERWISE, pop the last station from the currentPath, and move on to the next route.

            }
        }


    };
}
module.exports.RouteInfoProvider = RouteInfoProvider;
