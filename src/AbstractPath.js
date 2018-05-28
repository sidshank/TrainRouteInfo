/**
 * Class representing the general notion of a path consisting of nodes and connections between the nodes
 */
class AbstractPath {

    /**
     * Constructor. Only meant to be called from concrete instances of AbstractPath
     * @param {Array} nodes 
     */
    constructor(nodes) {
        if (new.target === AbstractPath) {
            throw new TypeError("Construction of AbstractPath is disallowed. It is an abstract class.");
        }
        this.Nodes = [].concat(nodes);
    }

    /**
     * Produces string representation of this path
     * @return {string} Comma-delimited names of nodes in the path
     */
    toString() {
        return this.Nodes.map(n => n.getName()).join(", ");
    }

    /**
     * Getter: The final node in the path
     * @return {Node} The final node, or NULL for a path with one node
     */
    get EndPoint() {
        if (this.Nodes.length === 1) {
            return null;
        } else {
            return this.Nodes[this.Nodes.length - 1];
        }
    }

    /**
     * Getter : The number of nodes in this path
     * @return {number}
     */
    get NodeCount() {
        // Origin doesn't count as a node
        return this.Nodes.length - 1;
    }

    /**
     * Getter : The cumulative distance of the connections between nodes in this path
     * @return {number}
     */
    get Distance() {
        let distance = 0;
        for (let n = 0; n < this.Nodes.length - 1; n++) {
            distance += this.Nodes[n].getDistanceTo(this.Nodes[n + 1]);
        }
        return distance;
    }
}

module.exports.AbstractPath = AbstractPath;