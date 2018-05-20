class RouteInfoProvider {

    constructor(routeInfo) {
        if (! (routeinfo instanceof RouteInfo)) {
            throw "RouteInfoProvider only works with instances of RouteInfo"
        }
        this.RouteInfo = routeInfo;
    }
}
