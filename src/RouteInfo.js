/* jshint esversion: 6 */
let Station = require("./Station.js").Station;
let Utils = require("./Utils.js").Utils;

class RouteInfo {

    constructor() {
        this.StationNameToNode = new Map();
    }   

    addRoute(originName, destinationName, distance) {
        let originNode = this.getOrCreateStation(originName);
        let destinationNode = this.getOrCreateStation(destinationName);
        originNode.connectTo(destinationNode, distance);
        Utils.debuglog("Added route from " + originName + " to " + destinationName + " : " + distance);
        return this;
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
            Utils.debuglog("Created station " + stationName);
        } else {
            stationNode = this.getStation(stationName);
        }
        return stationNode;
    }

    isStation(stationName) {
        return this.StationNameToNode.has(stationName);
    }
}

module.exports.RouteInfo = RouteInfo;