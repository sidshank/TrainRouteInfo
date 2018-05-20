export class RouteInfo {

    constructor() {
        this.StationNameToNode = new Map();
    }

    addRoute(originName, destinationName, distance) {
        let originNode = getOrCreateStation(originName);
        let destinationNode = getOrCreateStation(destination);
        originNode.connectTo(destinationNode, distance);
    }

    getStation(stationName) {
        if (!this.isStation(stationName)) {
            throw "No such station: " + stationName;
        }
        return this.StationNameToNode.get(stationName);
    }

    getOrCreateStation(stationName) {
        let stationNode = null;
        if (!this.isStation(stationName)) {
            stationNode = new Station(stationName);
            this.StationNameToNode.set(stationName, stationNode);
        } else {
            stationNode = this.getStation(stationName);
        }
        return stationNode;
    }

    isStation(stationName) {
        return this.StationNameToNode.has(stationName);
    }
}

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
        return this.OutboundConnections.filter(c => c.getName() === destinationStation.getName())[0];
    }

    this.connectTo = function(destinationStation, distance) {
        if (this.hasDirectRouteTo(destinationStation)) {
           throw "Station " + this.getName() +
               " already has a direct connection to " + destinationStation.getName();
        }
        let route = new Route(destinationStation, distance);
        this.OutboundConnections.push(route);
    }
}

function Route(destinationStation, distance) {
    if (!(destinationStation instanceof Station)) {
        throw "Specified destination is not a Station object";
    } else if (distance <= 0) {
        throw "distance must be a positive value";
    }
    this.Distance = distance;
    this.DestinationStation = destinationStation;
}
