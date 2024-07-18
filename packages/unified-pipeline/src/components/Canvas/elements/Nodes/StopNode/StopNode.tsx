import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Square } from "iconoir-react";
import type { DefaultNodeProps, ExpandNodeProps } from "../../../types";
import { useCanvasStore } from "../../../../../framework/CanvasStore/CanvasStoreContext";

import css from "./StopNode.module.scss";

export interface StopNodeProps extends DefaultNodeProps, ExpandNodeProps {}

export default function StopNode({
  xPos,
  yPos,
  data,
}: NodeProps<StopNodeProps>) {
  const { enableDiagnostics } = useCanvasStore();
  const { targetPosition = Position.Left, sourcePosition = Position.Right } =
    data as DefaultNodeProps;
  return (
    <>
      <Handle position={targetPosition} type="target" />
      <div className={css.main}>
        <Square />
        {enableDiagnostics?.Node && (
          <span className={css.diagnose}>
            ({xPos},{yPos})
          </span>
        )}
      </div>
      <Handle position={sourcePosition} type="source" />
    </>
  );
}
