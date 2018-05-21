/* jshint esversion:6*/
function Path(origin) {
    this.TripDistance = 0;

    this.Stops = [origin];

    this.addStop = function(station) {
        let currentStation = this.Stops[this.Stops.length - 1];
        let distance = currentStation.getDistanceTo(station);
        if (isNaN(distance)) {
            throw "No route exists between " + currentStation.getName() + " " + station.getName;
        }
        this.Stops.push(station);
        this.TripDistance += distance;
    };
}
module.exports.Path = Path;
