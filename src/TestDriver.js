/* jshint esversion: 6 */
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;
let Utils  = require("./Utils.js").Utils;

// Set to TRUE to print graph construction and travsersal logs
Utils.isLoggingEnabled = false;

/* BUILD THE GRAPH REPRESENTATION */
const graphRepresentation = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
const graphBuilder = RouteInfoProvider.createGraphBuilder();

let graph = graphBuilder.setEntryDelimiter(",")
            .setEncodingScheme("lln") // For entries of the form AB20 (LetterLetterNumber)
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


/*

=============================
Output #1: Distance of the route 'A-B-C'
=============================
9


=============================
Output #2: Distance of the route 'A-D'
=============================
5


=============================
Output #3: Distance of the route 'A-D-C'
=============================
13


=============================
Output #4: Distance of the route 'A-E-B-C-D'
=============================
22


=============================
Output #5: Distance of the route 'A-E-D'
=============================
NO SUCH ROUTE


=============================
Output #6: The number of trips starting at C and ending at C with a maximum of 3 stops
=============================

C, D, C
C, E, B, C

=============================
Output #7: The number of trips starting at A and ending at C with exactly 4 stops.
=============================

A, B, C, D, C
A, D, C, D, C
A, D, E, B, C

=============================
Output #8: The length of the shortest route (in terms of distance to travel) from A to C
=============================
9


=============================
Output #9: The length of the shortest route (in terms of distance to travel) from B to B
=============================
9


=============================
Output #10: The number of different routes from C to C with a distance of less than 30
=============================

C, D, C
C, D, C, E, B, C
C, D, E, B, C
C, E, B, C
C, E, B, C, D, C
C, E, B, C, E, B, C
C, E, B, C, E, B, C, E, B, C

*/