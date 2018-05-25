/* jshint esversion:6*/
class ImmutablePath {

    constructor(stops) {
        this.Stops = [].concat(stops);
    }
    
    toString() {
        return this.Stops.map(s => s.getName()).join(",");
    }

    getEndPoint() {
        if (this.Stops.length === 1) {
            return null;
        } else {
            return this.Stops[this.Stops.length - 1];
        }
    }

    pushStation(stop) {
        return new ImmutablePath(this.Stops.concat(stop))
    }

    getDistance() {
        let distance = 0;
        for (let s = 0; s < this.Stops.length - 1; s++) {
            distance += this.Stops[s].getDistanceTo(this.Stops[s + 1]);
        }
        return distance;
    }
}
module.exports.ImmutablePath = ImmutablePath;