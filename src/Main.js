/* jshint esversion: 6 */

let GraphBuilder = require("./GraphBuilder.js").GraphBuilder;
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;
let Utils  = require("./Utils.js").Utils;

// Set to TRUE to print graph construction and travsersal logs
Utils.isLoggingEnabled = false;

/* BUILD THE GRAPH REPRESENTATION */
const graphRepresentation = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
const graphBuilder = new GraphBuilder();

let graph = graphBuilder.setEntryDelimiter(",")
            .setEncodingScheme("lln") // For entries of the form AB20
            .usingRepresentation(graphRepresentation)
            .build();

/* INSTANTIATE A ROUTEINFOPROVIDER TO ANSWER ROUTE RELATED QUESTIONS*/
const routeInfoProvider = new RouteInfoProvider(graph);

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