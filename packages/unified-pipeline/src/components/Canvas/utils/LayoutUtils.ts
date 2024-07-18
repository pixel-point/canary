import { Node, Edge, Position } from "reactflow";
import dagre from "dagre";
import {
  getChildNodes,
  getLayoutableNodes,
  getNonLayoutableNodes,
  findIntersection,
  partitionNodesByParallelism,
  excludeAnchorNodes,
} from "./NodeUtils";
import {
  NODE_HORIZONTAL_MARGIN,
  NODE_NODE_SEPARATION,
  NODE_NODE_SEPARATION_READ_ONLY,
  NODE_VERTICAL_MARGIN,
} from "./LROrientation/Constants";

// Layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom)
export enum Direction {
  TB = "TB",
  LR = "LR",
  RL = "RL",
  BT = "BT",
}

export type Options = {
  direction: Direction;
};

interface LayoutArgs {
  nodes: Node[];
  edges: Edge[];
  direction?: Direction;
  width?: number;
  height?: number;
  readonly?: boolean;
}

interface DagreLayoutArgs extends LayoutArgs {
  nodeNodeSeparation: number;
  margin?: number;
}

interface LayoutedElements {
  nodes: Node[];
  edges: Edge[];
}

export const performLayout = ({
  nodes,
  edges,
  width,
  height,
  readonly,
}: LayoutArgs): LayoutedElements => {
  if (nodes.length === 0) return { nodes, edges };
  const selfLayoutableNodes = getLayoutableNodes(nodes);
  const layoutedNodes: Node[] = [];
  const layoutedEdges: Edge[] = [];
  const nonLayoutableNodes = getNonLayoutableNodes(nodes);
  if (nonLayoutableNodes.length > 0) {
    selfLayoutableNodes.map((node: Node) => {
      /* Dagre Layout can work without a root, hence layouting of child nodes becomes possible. */
      const parentNodeId = node.id;
      const childNodes = getChildNodes(parentNodeId, nonLayoutableNodes);
      const childNodeCount = childNodes.length;
      if (childNodeCount > 0) {
        const { parallel: parallelNodes, sequential: sequentialChildNodes } =
          partitionNodesByParallelism(childNodes);
        const parallelNodeCount = parallelNodes.length;
        if (parallelNodeCount > 0) {
          const commonChildNodes = findIntersection(childNodes, parallelNodes);
          /* Layout parallel nodes separately */
          const parallelLayoutedElements = dagreLayout({
            nodes: commonChildNodes,
            edges,
            direction: Direction.TB,
            width,
            height,
            margin: NODE_HORIZONTAL_MARGIN,
            nodeNodeSeparation: readonly
              ? NODE_NODE_SEPARATION_READ_ONLY
              : NODE_NODE_SEPARATION,
          });
          layoutedNodes.push(...parallelLayoutedElements.nodes);
          layoutedEdges.push(...parallelLayoutedElements.edges);
          /* Layout sequential nodes separately */
          const layoutedSequentialElements = dagreLayout({
            nodes: sequentialChildNodes,
            edges,
            width,
            height,
            margin: NODE_VERTICAL_MARGIN,
            nodeNodeSeparation: readonly
              ? NODE_NODE_SEPARATION_READ_ONLY
              : NODE_NODE_SEPARATION,
          });
          layoutedNodes.push(...layoutedSequentialElements.nodes);
          layoutedEdges.push(...layoutedSequentialElements.edges);
        } else {
          const layoutedSequentialElements = dagreLayout({
            nodes: childNodes,
            edges,
            width,
            height,
            margin: NODE_VERTICAL_MARGIN,
            nodeNodeSeparation: readonly
              ? NODE_NODE_SEPARATION_READ_ONLY
              : NODE_NODE_SEPARATION,
          });
          layoutedNodes.push(...layoutedSequentialElements.nodes);
          layoutedEdges.push(...layoutedSequentialElements.edges);
        }
      }
    });
  }
  return { nodes: layoutedNodes, edges: layoutedEdges };
};

const dagreLayout = ({
  nodes,
  edges,
  direction = Direction.LR,
  width = 1800,
  height = 900,
  margin = 0,
  nodeNodeSeparation = 50,
}: DagreLayoutArgs): LayoutedElements => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === Direction.LR;
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: nodeNodeSeparation,
    marginx: isHorizontal ? margin : 0,
    marginy: isHorizontal ? 0 : margin,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.width, height: node.height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Scale so that nodes render within parent width and height
  const graph = dagreGraph.graph();
  const scaleX = graph.width ? Math.min(1, width / graph.width) : 1;
  const scaleY = graph.height ? Math.min(1, height / graph.height) : 1;
  const scale = Math.min(scaleX, scaleY);

  const layoutedNodes = nodes.map((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    let x = nodeWithPosition.x * scale;
    let y = nodeWithPosition.y * scale;
    // Center nodes horizontally or vertically based on direction
    if (isHorizontal) {
      y = height / 2; // Center vertically
      x = x + margin;
    } else {
      // Filter out anchor nodes to identify the first and last non-anchor nodes
      const nonAnchorNodes = excludeAnchorNodes(nodes);
      let firstNonAnchorNode = null;
      let lastNonAnchorNode = null;
      if (nonAnchorNodes.length > 0) {
        firstNonAnchorNode = nonAnchorNodes[0];
        lastNonAnchorNode = nonAnchorNodes[nonAnchorNodes.length - 1];
      }
      x = width / 2; // Center horizontally
      if (node.id === firstNonAnchorNode?.id) {
        y = y + margin;
      } else if (node.id === lastNonAnchorNode?.id) {
        y = y - margin;
      }
    }

    // Return updated node with position and edge positions
    return {
      ...node,
      position: { x, y },
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
    };
  });

  // Return layouted nodes and original edges
  return {
    nodes: layoutedNodes,
    edges,
  };
};
