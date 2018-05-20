import RouteInfo from "./RouteInfo.js";

class RouteInfoProvider {

    constructor(routeInfo) {
        if (! (routeinfo instanceof RouteInfo)) {
            throw "RouteInfoProvider only works with instances of RouteInfo"
        }
        this.RouteInfo = routeInfo;
    }

    getDistance(stations) {
        const stationNames = stations.split("-");
        let totalDistance = 0;
        for (let stationName of stationNames) {
            if (!this.RouteInfo.isStation(stationName)) {
                console.log("NO SUCH ROUTE");
                return;
            }
            let station = this.RouteInfo.getStation(stationName);
            totalDistance += station.getDistanceTo(station);
            if (isNaN(totalDistance)) {
                console.log("NO SUCH ROUTE");
            }
            return;
        }
        return totalDistance;
    }
}
