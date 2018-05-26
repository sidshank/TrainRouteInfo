/* jshint esversion:6*/
let AbstractPath = require("./AbstractPath.js").AbstractPath;
let ImmutablePath = require("./ImmutablePath.js").ImmutablePath;

/**
 * Class representing a path from a source node to a destination node
 * through one or more nodes.
 */
class Path extends AbstractPath {
    
    /**
     * Construct a Path, with the specified source node.
     * @param {Node} sourceNode 
     */
    constructor(sourceNode) {
        super(sourceNode);
        this._Distance = 0;
        this.DistanceSegments = [];
    }

    /**
     * Add a new node to the end of this path
     * @param {Node} node The node to add to the path
     */
    pushNode(node) {
        let currentNode = this.Nodes[this.Nodes.length - 1];
        let distance = currentNode.getDistanceTo(node);
        
        if (isNaN(distance)) {
            throw "No connection exists between " + currentNode.getName() + " " + node.getName();
        }
        this.Nodes.push(node);
        this._Distance += distance;
        this.DistanceSegments.push(distance);
    }

    /**
     * Remove the node at the end of this path
     * @return {boolean} Indication of whether the POP was successful
     */
    popNode() {
        if (this.NodeCount > 0) {
            const lastNode = this.Nodes.pop();
            const distanceToLastNode = this.DistanceSegments.pop();
            this._Distance -= distanceToLastNode;
            return true;
        }
        // Pop was unsuccessful
        return false;
    }

    /**
     * @return {ImmutablePath} a new ImmutablePath containing all the nodes of this Path
     */
    asImmutablePath() {
        return new ImmutablePath(this.Nodes.slice(0));
    }

    /**
     * Getter : Get cumulative distance of this path
     * @return {number}
     */
    get Distance() {
        return this._Distance;
    }
}

module.exports.Path = Path;