/* jshint esversion:6*/
function WayPoints(stations) {
    this.Stations = stations;
    this.toString = function() {
        return this.Stations.map(s => s.getName()).join(",");
    };
}
module.exports.WayPoints = WayPoints;
