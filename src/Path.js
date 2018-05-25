/* jshint esversion:6*/
let WayPoints = require("./WayPoints.js").WayPoints;
function Path(origin) {
    this.Origin = origin;
    this.Stops = [origin];
    this.TripDistance = 0;
    this.DistanceSegments = [];

    this.pushStation = function(station, distance) {
        let currentStation = this.Stops[this.Stops.length - 1];
        if (distance === undefined) {
            distance = currentStation.getDistanceTo(station);
        }
        if (isNaN(distance)) {
            throw "No route exists between " + currentStation.getName() + " " + station.getName();
        }
        this.Stops.push(station);
        this.TripDistance += distance;
        this.DistanceSegments.push(distance);
    };

    this.pushRoute = function(route) {
        this.pushStation(route.DestinationStation, route.Distance);
    };

    this.popStation = function() {
        if (this.getStopCount() > 0) {
            const lastStop = this.Stops.pop();
            const distanceToLastStop = this.DistanceSegments.pop();
            this.TripDistance -= distanceToLastStop;
            return true;
        }
        // Pop was unsuccessful
        return false;
    };

    this.getStopCount = function() {
        // Origin doesn't count as a stop
        return this.Stops.length - 1;
    };

    this.getEndPoint = function() {
        if (this.Stops.length === 1) {
            // A path must have at least 2 stops, to have an end-point
            return null;
        } else {
            return this.Stops[this.Stops.length - 1];
        }
    };

    this.getWayPoints = function() {
        return new WayPoints(this.Stops.slice(0));
    };

    this.toString = function() {
        return this.Stops.map(s => s.getName()).join(",");
    };
}
module.exports.Path = Path;
