/* jshint esversion: 6 */
let Node = require("./Node.js").Node;
let Utils = require("./Utils.js").Utils;

/**
 * Class representing a graph builder
 */
class GraphBuilder {

    /**
     * Construct a graph builder object
     */
    constructor() {
        this.NodeNameToNodeObj = new Map();
        this.EntryDelimiter = ","; // Comma is default
        this.Recognizer = /(\w)(\w)(\d+)/; // LetterLetterNumber is default
        this.Representation = "";
    }

    /**
     * Sets the inter-entry delimiter, based on which the graph representation
     * must be split
     * @param {string} delim The inter-entry delimiter
     */
    setEntryDelimiter(delim) {
        this.EntryDelimiter = delim;
        return this;
    }

    /**
     * Sets the encoding scheme to recognize a graph entry. Options are
     * lln (LetterLetterNumber) or wwn (WordWordNumber)
     * @param {string} scheme Must be lln or wwn
     */
    setEncodingScheme(scheme) {
        switch(scheme) {
            case "lln":
                this.Recognizer = /(\w)(\w)(\d+)/;
                break;
            case "wwn":
                this.Recognizer = /(\w+)-(\w+)-(\d+)/
                break;
            default:
                throw "Invalid encoding scheme. Valid options are: lln, wwn";
        }
        return this;
    }

    /**
     * Sets the graph representation
     * @param {string} repr The graph representation 
     */
    usingRepresentation(repr) {
        this.Representation = repr;
        return this;
    }

    /**
     * Build the graph based on entry delimiter, encoding scheme and the
     * specified graph representation.
     */
    build() {
        const graphEntries = this.Representation.split(this.EntryDelimiter)
                                                .map(entry => entry.trim());
        for (let entry of graphEntries) {
            let match, source, destination, distance;
            try {
                [match, source, destination, distance] = entry.match(this.Recognizer);
            } catch (ex) {
                console.log(ex);
                throw "Invalid entry in graph representation: " + entry;
            }
            
            distance = parseFloat(distance, 10);
            this.addConnection(source, destination, distance);
        }
        return this.Graph;
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