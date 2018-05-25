/* jshint esversion:6*/
let ImmutablePath = require("./ImmutablePath.js").ImmutablePath;
class Path {
    constructor(origin) {
        this.Origin = origin;
        this.Stops = [origin];
        this.TripDistance = 0;
        this.DistanceSegments = [];
    }

    pushStation(station, distance) {
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
    }

    pushRoute(route) {
        this.pushStation(route.DestinationStation, route.Distance);
    }

    popStation() {
        if (this.getStopCount() > 0) {
            const lastStop = this.Stops.pop();
            const distanceToLastStop = this.DistanceSegments.pop();
            this.TripDistance -= distanceToLastStop;
            return true;
        }
        // Pop was unsuccessful
        return false;
    }

    getStopCount() {
        // Origin doesn't count as a stop
        return this.Stops.length - 1;
    }

    getEndPoint() {
        if (this.Stops.length === 1) {
            // A path must have at least 2 stops, to have an end-point
            return null;
        } else {
            return this.Stops[this.Stops.length - 1];
        }
    }

    asImmutablePath() {
        return new ImmutablePath(this.Stops.slice(0));
    }

    toString() {
        return this.Stops.map(s => s.getName()).join(",");
    }
}
module.exports.Path = Path;