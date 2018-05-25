/* jshint esversion: 6 */
let RouteInfo = require("./RouteInfo.js").RouteInfo;
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;
let Utils  = require("./Utils.js").Utils;

// Set to TRUE to print graph construction and travsersal logs
Utils.isDebugging = false;

const routeInfo = new RouteInfo();
const graphRepresentation = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
const graphEntries = graphRepresentation.split(",").map(ge => ge.trim());
for (let ge of graphEntries) {
    let source, destination, distance;
    [source, destination, distance] = ge.split("");
    distance = parseFloat(distance, 10);
    routeInfo.addRoute(source, destination, distance);
}
const routeInfoProvider = new RouteInfoProvider(routeInfo);

let outputCount = 0;

Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-B-C"));
Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-D"));
Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-D-C"));
Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-E-B-C-D"));
Utils.resultlog("Distance of the route 'A-B-C'", routeInfoProvider.getDistance("A-E-D"));

Utils.resultlog("The number of trips starting at C and ending at C with a maximum of 3 stops");
let paths = routeInfoProvider.findPaths("C", "C", p => p.getStopCount() <= 3, p => p.getStopCount() < 3);
paths.forEach(wpList => console.log(wpList.toString()))

Utils.resultlog("The number of trips starting at A and ending at C with exactly 4 stops.");
paths = routeInfoProvider.findPaths("A", "C", p => p.getStopCount() === 4, p => p.getStopCount() < 4);
paths.forEach(wpList => console.log(wpList.toString()));

Utils.resultlog("The length of the shortest route (in terms of distance to travel) from A to C");
console.log("Shortest distance is: " + routeInfoProvider.findShortestDistance("A", "C"));

Utils.resultlog("The length of the shortest route (in terms of distance to travel) from B to B");
console.log("Shortest distance is: " + routeInfoProvider.findShortestDistance("B", "B"));

Utils.resultlog("The number of different routes from C to C with a distance of less than 30");
paths = routeInfoProvider.findPaths("C", "C", p => p.TripDistance < 30, p => p.TripDistance < 30);
paths.forEach(wpList => console.log(wpList.toString()));