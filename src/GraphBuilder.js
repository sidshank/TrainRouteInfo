/* jshint esversion: 6 */
let Node = require("./Node.js").Node;
let Utils = require("./Utils.js").Utils;

/**
 * Class representing a graph builder
 */
class GraphBuilder {

    constructor() {
        this.NodeNameToNodeObj = new Map();
    }

    /**
     * Add a connection from a source to a destination
     * @param {string} sourceName 
     * @param {string} destinationName 
     * @param {number} distance 
     * @return {GraphBuilder} (To allow using this as a builder)
     */
    addConnection(sourceName, destinationName, distance) {
        let sourceNode = this.getOrCreateNode(sourceName);
        let destinationNode = this.getOrCreateNode(destinationName);
        sourceNode.connectTo(destinationNode, distance);

        Utils.debuglog("Added connection from " + sourceName + " to " + destinationName + " : " + distance);

        return this;
    }

    /**
     * Get the node object with the specified name
     * @param {string} nodeName 
     * @return {Node} If node exists, or throws exception if node doesn't exist.
     */
    getNode(nodeName) {
        if (!this.isNode(nodeName)) {
            throw "No such node: " + nodeName;
        }
        return this.NodeNameToNodeObj.get(nodeName);
    }

    /**
     * Get the node object with the specified name. Creates a node if one doesn't exist.
     * @param {string} nodeName 
     * @return {Node} 
     */
    getOrCreateNode(nodeName) {
        let nodeNode = null;
        if (!this.isNode(nodeName)) {
            nodeNode = new Node(nodeName);
            this.NodeNameToNodeObj.set(nodeName, nodeNode);
            Utils.debuglog("Created node: " + nodeName);
        } else {
            nodeNode = this.getNode(nodeName);
        }
        return nodeNode;
    }

    /**
     * Query if a node with the specified name exists.
     * @param {string} nodeName 
     */
    isNode(nodeName) {
        return this.NodeNameToNodeObj.has(nodeName);
    }

    /**
     * @return {Object} Simple interface to ask questions about the graph
     */
    get Graph() {
        return {
            NodeNameToNodeObj: this.NodeNameToNodeObj,
            isNode: this.isNode,
            getNode: this.getNode
        }
    }
}

module.exports.GraphBuilder = GraphBuilder;