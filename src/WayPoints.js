/* jshint esversion:6*/
function WayPoints(stations) {
    this.Stations = [].concat(stations);
    this.toString = function() {
        return this.Stations.map(s => s.getName()).join(",");
    };

    this.getEndPoint = function() {
        if (this.Stations.length === 1) {
            return null;
        } else {
            return this.Stations[this.Stations.length - 1];
        }
    };
    this.add = function(station) {
        return new WayPoints(this.Stations.concat(station))
    };
    this.getDistance = function() {
        let distance = 0;
        for (let s = 0; s < this.Stations.length - 1; s++) {
            distance += this.Stations[s].getDistanceTo(this.Stations[s + 1]);
        }
        return distance;
    };
}
module.exports.WayPoints = WayPoints;
