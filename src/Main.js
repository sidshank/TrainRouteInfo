/* jshint esversion: 6 */

let GraphBuilder = require("./GraphBuilder.js").GraphBuilder;
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;
let Utils  = require("./Utils.js").Utils;

// Set to TRUE to print graph construction and travsersal logs
Utils.isDebugging = false;

/* BUILD THE GRAPH REPRESENTATION */
const graphBuilder = new GraphBuilder();
const graphRepresentation = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
const graphEntries = graphRepresentation.split(",").map(ge => ge.trim());
for (let ge of graphEntries) {
    let source, destination, distance;
    [source, destination, distance] = ge.split("");
    distance = parseFloat(distance, 10);
    graphBuilder.addConnection(source, destination, distance);
}

/* INSTANTIATE A ROUTEINFOPROVIDER TO ANSWER ROUTE RELATED QUESTIONS*/
const routeInfoProvider = new RouteInfoProvider(graphBuilder.Graph);

/* OUTPUT RESPONSES TO QUESTIONS */
Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-B-C"));
Utils.resultlog("Distance of the route 'A-D'", routeInfoProvider.getDistance("A-D"));
Utils.resultlog("Distance of the route 'A-D-C'", routeInfoProvider.getDistance("A-D-C"));
Utils.resultlog("Distance of the route 'A-E-B-C-D'", routeInfoProvider.getDistance("A-E-B-C-D"));
Utils.resultlog("Distance of the route 'A-E-D'", routeInfoProvider.getDistance("A-E-D"));

Utils.resultlog("The number of trips starting at C and ending at C with a maximum of 3 stops");
routeInfoProvider.findPaths("C", "C", p => p.NodeCount <= 3, p => p.NodeCount < 3)
                 .forEach(wpList => console.log(wpList.toString()));

Utils.resultlog("The number of trips starting at A and ending at C with exactly 4 stops.");
routeInfoProvider.findPaths("A", "C", p => p.NodeCount === 4, p => p.NodeCount < 4)
                 .forEach(wpList => console.log(wpList.toString()));

Utils.resultlog("The length of the shortest route (in terms of distance to travel) from A to C", 
    routeInfoProvider.findShortestDistance("A", "C"));

Utils.resultlog("The length of the shortest route (in terms of distance to travel) from B to B", 
    routeInfoProvider.findShortestDistance("B", "B"));

Utils.resultlog("The number of different routes from C to C with a distance of less than 30");
routeInfoProvider.findPaths("C", "C", p => p.Distance < 30, p => p.Distance < 30)
                 .forEach(wpList => console.log(wpList.toString()));