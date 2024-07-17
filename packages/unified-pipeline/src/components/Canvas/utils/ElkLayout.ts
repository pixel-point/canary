/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import ELK, {
  ElkExtendedEdge,
  ElkNode,
  LayoutOptions,
} from "elkjs/lib/elk.bundled";
import { type Edge, type Node } from "reactflow";
import { get } from "lodash-es";
import {
  NODE_DEFAULT_HEIGHT,
  NODE_DEFAULT_WIDTH,
  PLUS_NODE_ID,
  ROOT_NODE_ID,
} from "./LROrientation/Constants";
import { getChildNodes, getLayoutableNodes } from "./NodeUtils";
import { dedupEdges, getConnectedEdges } from "./EdgeUtils";
import { isValidPositiveInteger } from "../../../utils/StringUtils";

export interface EdgeData {
  parentNode?: string;
}

export interface LayoutedGraph {
  nodes: Node[];
  edges: Edge<EdgeData>[];
  options?: LayoutOptions;
  margin?: number;
}

export const elkOptions = {
  "elk.algorithm": "layered",
  "elk.layered.spacing.nodeNodeBetweenLayers": "300",
  "elk.spacing.nodeNode": "100",
  "elk.direction": "RIGHT",
  "elk.layered.nodePlacement.strategy": "INTERACTIVE",
  // "elk.hierarchyHandling": "INCLUDE_CHILDREN",
};

export const calculateSpacingBetweenLayers = (nodes: Node[]): string => {
  // Find the maximum width and height among all nodes
  const maxWidth = Math.max(...nodes.map((node) => node.width ?? 0));
  const maxHeight = Math.max(...nodes.map((node) => node.height ?? 0));
  // Set a minimum spacing to avoid overlap, could be based on node size
  const minimumSpacing = Math.min(maxWidth, maxHeight);
  return minimumSpacing.toString(); // Return as string for ELK options
};

export async function performElkLayout({
  nodes,
  edges,
  options = elkOptions,
  margin = 50,
}: LayoutedGraph): Promise<LayoutedGraph> {
  let spacing: number = 0;
  try {
    spacing = parseInt(
      get(elkOptions, "elk.layered.spacing.nodeNodeBetweenLayers")
    );
  } catch (e) {
    // ignore error
  }
  spacing = isValidPositiveInteger(spacing) ? spacing : margin;
  if (nodes.length === 0) return { nodes, edges };
  const isHorizontal =
    options?.["elk.direction"] === "RIGHT" ||
    options?.["elk.direction"] === "LEFT";
  const includChildNodeEdges =
    get(elkOptions, "elk.hierarchyHandling") === "INCLUDE_CHILDREN";
  const graph: ElkNode = {
    id: "root",
    layoutOptions: elkOptions,
    children: nodes.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      width: node?.width ?? NODE_DEFAULT_WIDTH,
      height: node?.height ?? NODE_DEFAULT_HEIGHT,
      /* Can't include child nodes without include child node edges as well */
      ...(includChildNodeEdges && {
        children: getChildNodes(node.id, nodes).map((childNode) => ({
          ...childNode,
          targetPosition: isHorizontal ? "left" : "top",
          sourcePosition: isHorizontal ? "right" : "bottom",
          width: childNode?.width ?? NODE_DEFAULT_WIDTH,
          height: childNode?.height ?? NODE_DEFAULT_HEIGHT,
        })),
        edges: getConnectedEdges(
          node.id,
          edges
        ) as unknown as ElkExtendedEdge[],
      }),
    })),
    edges: edges as unknown as ElkExtendedEdge[],
  };

  const elk = new ELK();
  const elkGraph = await elk.layout(graph);

  const layoutedNodes =
    elkGraph?.children?.flatMap((node) => {
      const nodes = [
        {
          ...node,
          position: { x: node.x!, y: node.y! },
        },
      ];
      if (
        includChildNodeEdges &&
        node &&
        node.children &&
        node.children.length > 0
      ) {
        nodes.push(
          ...node.children.map((n) => ({
            ...n,
            position: { x: n.x!, y: node.y! },
            style: {},
          }))
        );
      }
      return nodes;
    }) || [];

  // Find the center line (median y or x position)
  const layoutedNodesExcludingChildNodes = getLayoutableNodes(
    layoutedNodes as unknown as Node[]
  );
  const layoutedNodesExceptTerminalNodes =
    layoutedNodesExcludingChildNodes.filter(
      (node) => node.id !== ROOT_NODE_ID && node.id !== PLUS_NODE_ID
    );
  let centerLine: number;
  if (isHorizontal) {
    const minY = layoutedNodesExceptTerminalNodes.reduce(
      (min, node) => Math.min(min, node.position.y),
      Infinity
    );
    const maxY = layoutedNodesExceptTerminalNodes.reduce(
      (max, node) => Math.max(max, node.position.y),
      -Infinity
    );
    centerLine = minY + (maxY - minY) / 2;
  } else {
    const minX = layoutedNodesExceptTerminalNodes.reduce(
      (min, node) => Math.min(min, node.position.x),
      Infinity
    );
    const maxX = layoutedNodesExceptTerminalNodes.reduce(
      (max, node) => Math.max(max, node.position.x),
      -Infinity
    );
    centerLine = minX + (maxX - minX) / 2;
  }

  // Find the leftmost and rightmost nodes
  const leftmostNode = layoutedNodesExceptTerminalNodes.reduce(
    (leftmost, node) =>
      node.position.x < leftmost.position.x ? node : leftmost
  );
  const rightmostNode = layoutedNodesExceptTerminalNodes.reduce(
    (rightmost, node) =>
      node.position.x > rightmost.position.x ? node : rightmost
  );

  // Adjust the "root" and "plus" nodes
  layoutedNodesExcludingChildNodes.forEach((node) => {
    const nodeWidth = node.width ?? NODE_DEFAULT_WIDTH;
    const halfNodeWidth = nodeWidth / 2;

    if (node.id === ROOT_NODE_ID) {
      const leftWidth = leftmostNode.width ?? NODE_DEFAULT_WIDTH;
      const halfLeftWidth = leftWidth / 2;

      node.position.x =
        leftmostNode.position.x - halfLeftWidth - halfNodeWidth - spacing;
      node.position.y = centerLine;
    } else if (node.id === PLUS_NODE_ID) {
      const rightWidth = rightmostNode.width ?? NODE_DEFAULT_WIDTH;
      const halfRightWidth = rightWidth / 2;

      node.position.x =
        rightmostNode.position.x + halfRightWidth + halfNodeWidth + spacing;
      node.position.y = centerLine;
    }
  });

  return {
    nodes: layoutedNodes as Node[],
    edges: elkGraph.edges
      ? (dedupEdges(elkGraph.edges as unknown as Edge[]) as Edge<EdgeData>[])
      : [],
  };
}
