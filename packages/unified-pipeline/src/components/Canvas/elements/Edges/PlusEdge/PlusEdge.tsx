import React from "react";
import cx from "classnames";
import { capitalize } from "lodash-es";
import {
  SmoothStepEdge,
  EdgeLabelRenderer,
  EdgeProps,
  Node,
  XYPosition,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import { Plus } from "iconoir-react";
import type { NodeType } from "../../../types";
import { useCanvasStore } from "../../../../../framework/CanvasStore/CanvasStoreContext";

import css from "./PlusEdge.module.scss";

export interface PlusEdgeProps {
  sourceNode: Node;
  targetNode: Node;
  sourcePosition: XYPosition;
  targetPosition: XYPosition;
  edgeClickData: {
    nodeType: NodeType;
  };
  zIndex: number;
}

export default function PlusEdge(props: EdgeProps<PlusEdgeProps>) {
  const { enableDiagnostics } = useCanvasStore();
  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
    id: edgeId,
  } = props;
  const { getNodes, setNodes } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const addNewNode = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (data?.targetPosition) {
      const existingNodes = getNodes();
      const newNodeType = data?.edgeClickData.nodeType;
      const relevantNodes = existingNodes.filter(
        (node) => node.type === newNodeType
      );
      const nodeCount = relevantNodes.length;
      const newNodeId = `${newNodeType}_${nodeCount + 1}`;
      const name = `${newNodeType} ${nodeCount + 1}`;
      const nodeName = capitalize(name);
      const newNode = {
        id: newNodeId,
        position: data.targetPosition,
        data: {
          ...data.targetNode.data,
          name: nodeName,
        },
        type: newNodeType,
      };
      const leftNodeSplit = existingNodes.filter(
        (node) => node.position.y < data.targetPosition.y
      );
      const rightNodeSplit = existingNodes.filter(
        (node) => node.position.y >= data.targetPosition.y
      );
      const updatedNodes = [...leftNodeSplit, newNode, ...rightNodeSplit];
      setNodes(updatedNodes);
    }
  };

  return (
    <>
      <SmoothStepEdge
        id={edgeId}
        pathOptions={{ path: edgePath }}
        sourcePosition={sourcePosition}
        targetPosition={targetPosition}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
        source={data?.sourceNode.id || ""}
        target={data?.targetNode.id || ""}
        markerEnd={markerEnd}
        style={style}
        label={
          <EdgeLabelRenderer>
            <div
              style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                pointerEvents: "all",
              }}
              className={cx(css.main, css.zIndex1, {
                [css.zIndex2]: data?.zIndex === 2,
              })}
            >
              {enableDiagnostics?.Edge && (
                <span className={css.diagnose}>{edgeId}</span>
              )}
              <Plus color="white" onClick={addNewNode} className={css.icon} />
            </div>
          </EdgeLabelRenderer>
        }
      />
    </>
  );
}
