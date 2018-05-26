/* jshint esversion: 6 */
let Edge = require("./Edge.js").Edge;

/**
 * Class representing a Node in a graph
 */
class Node {
    /**
     * Create a Node
     * @param {string} name - Name of the node
     */
    constructor(name) {
        this.Name = name;
        this.OutEdges = [];
    }

    /**
     * Defined equality of two nodes
     * @param {Node} otherNode - Other node to compare against
     */
    equals(otherNode) {
        return this.getName() === otherNode.getName();
    }

    /**
     * String representation of a node, is its name.
     */
    toString() {
        return this.getName();
    }
    
    /**
     * @return {string} Name of the node
     */
    getName() {
        return this.Name;
    }

    /**
     * Get distance to specified node
     * @param {Node} destinationNode 
     * @return {number} distance to specified node, NaN if no connection exists.
     */
    getDistanceTo(destinationNode) {
        let edge = this.getOutEdgeTo(destinationNode);
        if (edge) {
            return edge.Distance;
        } else {
            return NaN;
        }
    }

    /**
     * Test if this node is connected to specified node
     * @param {Node} destinationNode 
     * @return {boolean} Does direct connection exist to specified node
     */
    hasOutEdgeTo(destinationNode) {
        return this.getOutEdgeTo(destinationNode) !== undefined;
    }

    /**
     * Get the edge connecting to the specified node
     * @param {Node} destinationNode 
     * @return {Edge} Edge to specified node, undefined if no direct connection exists
     */
    getOutEdgeTo(destinationNode) {
        return this.OutEdges.filter(e => (e.DestinationNode.equals(destinationNode)))[0];
    }

    /**
     * Connect this node, to the specified destination
     * @param {*} destinationNode Node to connect to
     * @param {*} distance Distance to destination
     */
    connectTo(destinationNode, distance) {
        if (this.hasOutEdgeTo(destinationNode)) {
           throw "Node " + this.getName() +
               " already has a direct connection to " + destinationNode.getName();
        }
        let edge = new Edge(destinationNode, distance);
        this.OutEdges.push(edge);
    }
}

module.exports.Node = Node;