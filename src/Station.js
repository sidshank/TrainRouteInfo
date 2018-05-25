/* jshint esversion: 6 */
let Route = require("./Route.js").Route;

class Station {

    constructor(name) {
        this.Name = name;
        this.OutboundConnections = []; // outgoing edges in a DFG
    }
    
    getName() {
        return this.Name;
    }

    getDistanceTo(destinationStation) {
        let route = this.getDirectRouteTo(destinationStation);
        if (route) {
            return route.Distance;
        } else {
            return NaN;
        }
    }

    hasDirectRouteTo(destinationStation) {
        return this.getDirectRouteTo(destinationStation) !== undefined;
    }

    getDirectRouteTo(destinationStation) {
        return this.OutboundConnections.filter(r => (r.DestinationStation.equals(destinationStation)))[0];
    }

    connectTo(destinationStation, distance) {
        if (this.hasDirectRouteTo(destinationStation)) {
           throw "Station " + this.getName() +
               " already has a direct connection to " + destinationStation.getName();
        }
        let route = new Route(destinationStation, distance);
        this.OutboundConnections.push(route);
    }

    equals(station) {
        return this.getName() === station.getName();
    }

    toString() {
        return this.getName();
    }
}
module.exports.Station = Station;