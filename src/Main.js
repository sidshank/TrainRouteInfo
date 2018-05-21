/* jshint esversion: 6 */
let RouteInfo = require("./RouteInfo.js").RouteInfo;
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;
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

console.log(routeInfoProvider.getDistance("A-B-C"));
console.log(routeInfoProvider.getDistance("A-D"));
console.log(routeInfoProvider.getDistance("A-D-C"));
console.log(routeInfoProvider.getDistance("A-E-B-C-D"));
console.log(routeInfoProvider.getDistance("A-E-D"));
