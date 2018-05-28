/* jshint esversion: 6*/
let Path = require("./Path.js").Path;
let Utils = require("./Utils.js").Utils;
let GraphBuilder = require("./GraphBuilder.js").GraphBuilder;
let ImmutablePath = require("./ImmutablePath.js").ImmutablePath;

/**
 * Represents a class that takes a graph with nodes and edges, and is
 * able to respond to questions about this graph.
 */
class RouteInfoProvider {

    /**
     * Constructs a RouteInfoProvider
     * @param {Graph} graph - Representation of a graph with nodes and edges 
     */
    constructor(graph) {
        this.Graph = graph;
    }

    static get MAX_PATH_SEARCH_LENGTH() {
        return 5000;
    }

    /**
     * Returns the total distance of the specified path i.e. the sum of 
     * distances of each direct connection.
     * @param {string} stations - A hyphen delimited list of station names
     * @return {number}
     */
    getDistance(stations) {
        const stationNames = stations.split("-");
        const sourceStation = this.Graph.getNode(stationNames[0]);
        const path = new Path(sourceStation);
        for (let stationIdx = 1; stationIdx < stationNames.length; stationIdx++) {
            let destinationName = stationNames[stationIdx];
            let destination = this.Graph.getNode(destinationName);
            try {
                path.pushNode(destination);
            } catch (ex) {
                Utils.debuglog(ex);
                return "NO SUCH ROUTE";
            }
        }
        return path.Distance;
    }

    /**
     * Finds all paths between a source and destination, that match the specified pathPredicate
     * @param {string} sourceName - Name of source
     * @param {string} destinationName - Name of destination
     * @param {Function} pathPredicate - Path => Boolean predicate, meant to return TRUE for a Path that matches the search criteria
     * @param {Function} continuationPredicate - Path => Boolean predicate, meant to return TRUE for a Path, to indicate that continued traversal is OK
     * @return {Array} pathList - List of paths
     */
    findPaths(sourceName, destinationName, pathPredicate, continuationPredicate) {
        let sourceStation = this.Graph.getNode(sourceName);

        let destinationStation = this.Graph.getNode(destinationName);

        let pathList = [];

        let currentPath = null;

        const visit = (stationNode) => {
            // Visits using DFS traversal
            // The "currentPath" serves as a stack where
            // stations are pushed to, or popped from, to
            // represent the path currently being checked against
            // the predicate. When the currentPath matches the
            // predicate, we remember it by converting it to an 
            // ImmutablePath and storing it in the pathList.

            Utils.debuglog("Visiting " + stationNode);

            if (currentPath === null) {
                currentPath = new Path(stationNode);
            } else {
                currentPath.pushNode(stationNode);
            }

            if (currentPath.NodeCount > RouteInfoProvider.MAX_PATH_SEARCH_LENGTH) {
                throw "Node count in current path exceeded " + RouteInfoProvider.MAX_PATH_SEARCH_LENGTH;
            }

            Utils.debuglog("Current Path is: " + currentPath);

            let currentEndPoint = currentPath.EndPoint;

            // If the current path has a valid end point AND its end point matches the
            // specified destination, AND the path matches the specified criteria,
            // THEN, push it on to the list of paths matching the search criteria.
            if (currentEndPoint && currentEndPoint.equals(destinationStation) 
                                && pathPredicate(currentPath)) {
                Utils.debuglog("Found a path that matches the predicate: " + currentPath);
                pathList.push(currentPath.asImmutablePath());
            }

            // Decide whether to continue traversing the current path:
            // This boils down to whether there is any possibility of finding
            // additional paths that satisfy the path predicate, by continuing
            // to traverse the current path.
            if (continuationPredicate(currentPath)) {
                // OK to continue. Dig deeper by visiting each
                // of the destinations of the outbound routes from
                // the station currently being visited.
                let outboundRoutes = stationNode.OutEdges;

                for (let route of outboundRoutes) {
                    visit(route.DestinationNode);
                }
            } else {
                Utils.debuglog("Continuation predicate is no longer true, backtracking ... ");
            }
            
            // When finished, pop the node being visited from the "currentPath"
            currentPath.popNode();
        }

        visit(sourceStation);

        return pathList;
    }

    /**
     * Find the shortest distance between a source and a destination
     * @param {string} sourceName 
     * @param {string} destinationName
     * @return {number} The distance of the shortest path between source and destination
     */
    findShortestDistance(sourceName, destinationName) {
        const sourceStation = this.Graph.getNode(sourceName);
        const destinationStation = this.Graph.getNode(destinationName);
        
        let sourceIsDestination = false;
        if (sourceStation.equals(destinationStation)) {
            sourceIsDestination = true;
        }

        let processedStations = [];
        let shortestDistance = Infinity;
        let stationProcessingQueue = [sourceStation];
        let paths = [new ImmutablePath(sourceStation)];

        const visit = () => {
            // Visits using BFS traversal
            let currentPath = paths.shift();
            let currentEndPoint = currentPath.EndPoint;
            let stationNode = stationProcessingQueue.shift();
            Utils.debuglog("Visiting " + stationNode);

            if (currentEndPoint && stationNode.equals(destinationStation) 
                                && currentPath.Distance < shortestDistance) {
                Utils.debuglog("Found a path that matches the predicate: " + currentPath);
                shortestDistance = currentPath.Distance;
            } else {
                let outboundRoutes = stationNode.OutEdges;
                for (let route of outboundRoutes) {
                    let dest = route.DestinationNode;

                    // If we haven't processed a destination station yet,
                    // push it into the queue of stations to process.
                    // EXCEPTION: If the source and destination are the same station,
                    // then it is OK to push the station onto the processing queue again.
                    if (processedStations.indexOf(dest) === -1 || 
                        (sourceIsDestination && dest.equals(sourceStation))) {

                        stationProcessingQueue.push(dest);
                        paths.push(currentPath.pushNode(dest));

                    }
                }
            }
            processedStations.push(stationNode);
        }

        while (stationProcessingQueue.length !== 0) {
            visit();
        }

        return shortestDistance;
    }
}
module.exports.RouteInfoProvider = RouteInfoProvider;