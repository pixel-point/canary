import React, { useCallback, useEffect, useState } from "react";
import type { Edge, Node } from "reactflow";
import { Canvas } from "../Canvas/Canvas";
import type { Graph } from "../../components/Canvas/types";
import { getElementsFromGraph } from "../../utils/PipelineUtils";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { getEdgesForAllNodes } from "../../components/Canvas/utils/EdgeUtils";
import { getNodeDimensions } from "../Canvas/utils/NodeUtils";

interface PipelineStudioProps {
  graph: Graph;
  onAddNode: (addedNode: Node) => void;
  onDeleteNode: (deletedNode: Node) => void;
  onSelectNode: (deletedNode: Node) => void;
  readonly?: boolean;
}

export function PipelineStudio(props: PipelineStudioProps): JSX.Element {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    const initialNodes = getElementsFromGraph({
      graph: props.graph,
      readonly: props.readonly,
    });
    const initialEdges = getEdgesForAllNodes({
      nodes: initialNodes,
      includChildNodeEdges: false,
      readonly: props.readonly,
    });
    const nodesWithDimensions = initialNodes.map((node: Node) => ({
      ...node,
      ...getNodeDimensions(node),
    }));
    setNodes(nodesWithDimensions);
    setEdges(initialEdges);
  }, [props.graph.nodes]);

  const handleAddNode = useCallback((addedNode: Node): void => {
    props.onAddNode(addedNode);
  }, []);

  const handleDeleteNode = useCallback((deletedNode: Node): void => {
    props.onDeleteNode(deletedNode);
  }, []);

  const handleSelectNode = useCallback((selectedNode: Node): void => {
    props.onSelectNode(selectedNode);
  }, []);

  const wrapperRef = useCallback(
    (node: any) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [windowWidth, windowHeight]
  );

  return (
    <div ref={wrapperRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        nodes={nodes}
        edges={edges}
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        onSelectNode={handleSelectNode}
        height={height}
        width={width}
      />
    </div>
  );
}
