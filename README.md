#Route Information Provider

## About

The Route Information Provider is a utility that accepts a graph, and then provides the following information:

1. The distance of a given path of nodes (stations) in the graph
2. The list of all paths in the graph that meet a certain criteria
3. The path with the shortest distance between two specified nodes (stations)

## System Requirements

A personal computer, with Node installed. This software was tested on **Node 8.11.1**, but it should also work with Node versions **6.14.2** and higher.

## Installation

Download the files under the source tree into a single folder. No additional JS or Node modules needed.

## Execution

1. Navigate to the folder containing the downloaded files
2. Type: **Node TestDriver.js**, and press *ENTER*

## Usage Example

**TestDriver.js** already uses the **RouteInfoProvider** to answer a few questions, and provides concrete examples of all the capabilities of this module. Here's a brief description of the usage:

```javascript
let RouteInfoProvider  = require("./RouteInfoProvider.js").RouteInfoProvider;

/* BUILD THE GRAPH REPRESENTATION */
const graphBuilder = RouteInfoProvider.createGraphBuilder();
const graphRepresentation = "AB5, BC4, CA7, AC3, AD20, DC18";
let graph = graphBuilder.setEntryDelimiter(",") // inter-entry delimiter
            .setEncodingScheme("lln") // LetterLetterNumber
            .usingRepresentation(graphRepresentation)
            .build();

/* INSTANTIATE A ROUTEINFOPROVIDER TO ANSWER ROUTE RELATED QUESTIONS*/
const routeInfoProvider = new RouteInfoProvider(graph);

// Find the cumulative distance for a path of nodes
routeInfoProvider.getDistance("A-B-C") // returns 9

// Find the shortest distance between two nodes
routeInfoProvider.findShortestDistance("A", "C")) // returns 3

// Find the paths between two nodes, that meet the specified criteria.
// In this case, since the graph may be cyclic, you must provide a 
// "continuation predicate" to ensure graph traversal terminates when
// searching for paths
routeInfoProvider.findPaths("A", "C", p => p.NodeCount === 4, p => p.NodeCount < 4)
                 .forEach(wpList => console.log(wpList.toString()));
```

## Debugging

To see debugging print logs in the console:

```javascript
// Include the **Utils** module
let Utils  = require("./Utils.js").Utils;

// Enable logging
Utils.isLoggingEnabled = true;
```

To set breakpoints and debug this source code, I would recommend using Visual Studio Code, a cross platform IDE, to set breakpoints and monitor the execution.

## Meta

Developed by - Siddhartha Shankar - sidshank@umich.edu