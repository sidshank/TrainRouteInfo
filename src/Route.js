class Route {

    constructor(destinationStation, distance) {
        if (distance <= 0) {
            throw "distance must be a positive value";
        }
        this.Distance = distance;
        this.DestinationStation = destinationStation;
    }    
}
module.exports.Route = Route;
