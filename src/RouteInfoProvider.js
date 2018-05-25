/* jshint esversion: 6*/
let RouteInfo = require("./RouteInfo.js").RouteInfo;
let Path = require("./Path.js").Path;
let ImmutablePath = require("./ImmutablePath.js").ImmutablePath;
let Utils = require("./Utils.js").Utils;

class RouteInfoProvider {

    constructor(routeInfo) {
        if (! (routeInfo instanceof RouteInfo)) {
            throw "RouteInfoProvider only works with instances of RouteInfo";
        }
        this.RouteInfo = routeInfo;
    }    

    getDistance(stations) {
        const stationNames = stations.split("-");
        const originStation = this.RouteInfo.getStation(stationNames[0]);
        const path = new Path(originStation);
        for (let stationIdx = 1; stationIdx < stationNames.length; stationIdx++) {

            let destinationName = stationNames[stationIdx];
            let destination = this.RouteInfo.getStation(destinationName);
            try {
                path.pushStation(destination);
            } catch (ex) {
                Utils.debuglog(ex);
                return "NO SUCH ROUTE";
            }
        }
        return path.TripDistance;
    }

    findPaths(originName, destinationName, pathPredicate, continuationPredicate) {
        let originStation = this.RouteInfo.getStation(originName);

        let destinationStation = this.RouteInfo.getStation(destinationName);

        let pathList = [];

        let currentPath = null;

        doDFSTraversal(originStation);

        return pathList;

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
                pathList.push(currentPath.asImmutablePath());
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
    }

    findShortestDistance(originName, destinationName) {
        let originStation = this.RouteInfo.getStation(originName);
        let destinationStation = this.RouteInfo.getStation(destinationName);

        let nodeQueue = [originStation];
        let paths = [new ImmutablePath(originStation)];
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
                shortestDistance = currentPath.getDistance();
            } else {
                let outboundRoutes = stationNode.OutboundConnections;
                for (let route of outboundRoutes) {
                    let dest = route.DestinationStation;
                    if (done.indexOf(dest) === -1 || dest.equals(destinationStation)) {
                        nodeQueue.push(dest);
                        paths.push(currentPath.pushStation(dest));
                    }
                }
            }
        }
    }
}
module.exports.RouteInfoProvider = RouteInfoProvider;
