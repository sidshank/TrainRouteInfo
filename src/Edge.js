/* jshint esversion: 6 */

/**
 * Class representing an Edge in a graph
 */
class Edge {

    /**
     * Create an Edge
     * @param {Node} destinationNode - The node that this edge is directed at
     * @param {number} distance - The "weight" of this node
     */
    constructor(destinationNode, distance) {
        if (distance <= 0) {
            throw "distance must be a positive value";
        }
        this.Distance = distance;
        this.DestinationNode = destinationNode;
    }
}

module.exports.Edge = Edge