# errb-react-d3-graph Release Notes

## 3.0.0 (2021-04-01)

This release breaks version number correspondence with the original `react-d3-graph` project. If `react-d3-graph` ever releases a major version 3 and we want to receive or submit changes to the project, we'll figure out something new.

This version includes these changes:

-   Resolves an issue where the link force would lose the references to the two nodes associated with each link object, preventing the link force from functioning at all in many situations (resolution breaks some features of the original library we weren't using, such as expand/collapse for subgraphs)
-   Changes default `alphaTarget` value such that it is now possible by default for the graph to cool and stop firing tick events
-   Reheats simulation during a node drag operation, allowing it to respond while someone is dragging a node around
-   Replaces configurable link strength with default link strength function of `d3-force`
-   More effective detection of changes to the graph data objects passed into the `Graph` component

## 2.4.2 (2021-02-08)

This version includes these changes:

-   Modified size calculations to take into account the quadratic nature of area, which is the unit used by the underlying d3 library - this results in nodes correctly scaling at larger sizes
-   Added background to SVGs (this could later get moved to the downstream repository inside the `viewGenerator`)
-   Fixed label positioning to match the modified node size calculations

## 2.4.1 (2020-04-20)

This is the initial release of our fork of the `react-d3-graph` library. The only modification in this version is a shim function to allow continued backward compatibility with React 15 in our downstream use case.
