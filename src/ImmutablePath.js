/* jshint esversion:6*/
let AbstractPath = require("./AbstractPath.js").AbstractPath;

/**
 * Class representing an immutable Path
 */
class ImmutablePath extends AbstractPath {

    /**
     * Construct an immutable path
     * @param {Array[Node]} nodes 
     */
    constructor(nodes) {
        super(nodes);
    }

    /**
     * Add a node to an immutable path (does not modify this object)
     * @param {Node} node 
     * @return {ImmutablePath} A new ImmutablePath with the specified node added to existing nodes
     */
    pushNode(node) {
        return new ImmutablePath(this.Nodes.concat(node))
    }
}
module.exports.ImmutablePath = ImmutablePath;