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

        let wayPointsList = [];

        let currentPath = null;

        doDFSTraversal(originStation);

        return wayPointsList;

        function doDFSTraversal(stationNode) {
            console.log("Visiting " + stationNode);

            if (currentPath === null){
                currentPath = new Path(stationNode);
            } else {
                currentPath.pushStation(stationNode);
            }
            console.log("Current Path is: " + currentPath);

            let currentEndPoint = currentPath.getEndPoint();

            if (currentEndPoint && currentEndPoint.equals(destinationStation) && pathPredicate(currentPath)) {
                console.log("Found a path that matches the predicate: " + currentPath);
                wayPointsList.push(currentPath.getWayPoints());
            }

            if (continuationPredicate(currentPath)) {
                let outboundRoutes = stationNode.OutboundConnections;

                for (let route of outboundRoutes) {
                    let routeDestination = route.DestinationStation;
                    doDFSTraversal(routeDestination);
                }
            } else {
                console.log("Continuation predicate is no longer true, backtracking ... ");
            }

            currentPath.popStation();
        }
    };

    this.findShortestDistance = function() {

    };
}
module.exports.RouteInfoProvider = RouteInfoProvider;
