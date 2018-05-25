/* jshint esversion: 6*/
let RouteInfo = require("./RouteInfo.js").RouteInfo;
let Path = require("./Path.js").Path;
let WayPoints = require("./WayPoints.js").WayPoints;
let Utils = require("./Utils.js").Utils;

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
            Utils.debuglog("Visiting " + stationNode);

            if (currentPath === null){
                currentPath = new Path(stationNode);
            } else {
                currentPath.pushStation(stationNode);
            }
            Utils.debuglog("Current Path is: " + currentPath);

            let currentEndPoint = currentPath.getEndPoint();

            if (currentEndPoint && currentEndPoint.equals(destinationStation) && pathPredicate(currentPath)) {
                Utils.debuglog("Found a path that matches the predicate: " + currentPath);
                wayPointsList.push(currentPath.getWayPoints());
            }

            if (continuationPredicate(currentPath)) {
                let outboundRoutes = stationNode.OutboundConnections;

                for (let route of outboundRoutes) {
                    let routeDestination = route.DestinationStation;
                    doDFSTraversal(routeDestination);
                }
            } else {
                Utils.debuglog("Continuation predicate is no longer true, backtracking ... ");
            }

            currentPath.popStation();
        }
    };

    this.findShortestDistance = function(originName, destinationName) {
        let originStation = this.RouteInfo.getStation(originName);
        let destinationStation = this.RouteInfo.getStation(destinationName);

        let nodeQueue = [originStation];
        let paths = [new WayPoints(originStation)];
        let done = [];
        let shortestDistance = Infinity;

        while (nodeQueue.length !== 0) {
            visit();
        }

        return shortestDistance;

        function visit() {

            let stationNode = nodeQueue.shift();

            let currentPath = paths.shift();
            done.push(stationNode);
            let currentEndPoint = currentPath.getEndPoint();
            Utils.debuglog("Visiting " + stationNode);

            if (currentEndPoint && stationNode.equals(destinationStation) && currentPath.getDistance() < shortestDistance) {
                Utils.debuglog("Found a path that matches the predicate: " + currentPath);
                shortestPath = currentPath;
                shortestDistance = currentPath.getDistance();
            } else {
                let outboundRoutes = stationNode.OutboundConnections;
                for (let route of outboundRoutes) {
                    let dest = route.DestinationStation;
                    if (done.indexOf(dest) === -1 || dest.equals(destinationStation)) {
                        nodeQueue.push(dest);
                        paths.push(currentPath.add(dest));
                    }
                }
            }
        }
    };
}
module.exports.RouteInfoProvider = RouteInfoProvider;
