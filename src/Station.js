/* jshint esversion: 6 */
let Route = require("./Route.js").Route;
function Station(name) {
    this.Name = name;
    this.OutboundConnections = []; // outgoing edges in a DFG
    this.getName = function() {
        return this.Name;
    };

    this.getDistanceTo = function(destinationStation) {
        let route = this.getDirectRouteTo(destinationStation);
        if (route) {
            return route.Distance;
        } else {
            return NaN;
        }
    };

    this.hasDirectRouteTo = function(destinationStation) {
        return this.getDirectRouteTo(destinationStation) !== undefined;
    };

    this.getDirectRouteTo = function(destinationStation) {
        return this.OutboundConnections.filter(r => (r.DestinationStation.equals(destinationStation)))[0];
    };

    this.connectTo = function(destinationStation, distance) {
        if (this.hasDirectRouteTo(destinationStation)) {
           throw "Station " + this.getName() +
               " already has a direct connection to " + destinationStation.getName();
        }
        let route = new Route(destinationStation, distance);
        this.OutboundConnections.push(route);
    };

    this.equals = function(station) {
        return this.getName() === station.getName();
    };

    this.toString = function() {
            return this.getName();
    };
}
module.exports.Station = Station;
