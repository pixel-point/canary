import React, { useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Plus } from "iconoir-react";
import { DefaultNodeProps } from "../../../types";
import { useCanvasStore } from "../../../../../framework/CanvasStore/CanvasStoreContext";
import {
  ANCHOR_NODE_HEIGHT,
  ANCHOR_NODE_WIDTH,
} from "../../../utils/LROrientation/Constants";

import css from "./AnchorNode.module.scss";

export interface AnchorNodeProps extends DefaultNodeProps {}

/* Anchor nodes are only for anchoring layout and should not be visible on the Canvas */
export default function AnchorNode({
  id,
  data,
  xPos,
  yPos,
}: NodeProps<AnchorNodeProps>) {
  const { enableDiagnostics } = useCanvasStore();
  const [width] = useState<number>(ANCHOR_NODE_WIDTH);
  const [height] = useState<number>(ANCHOR_NODE_HEIGHT);
  const { targetPosition = Position.Left, sourcePosition = Position.Right } =
    data;
  return (
    <>
      {/**
       * @TODO Add support for orientation
       */}
      <Handle
        position={targetPosition}
        type="target"
        id={`${id}_target`}
        className={css.invisibleTarget}
      />
      <Handle
        position={targetPosition}
        type="source"
        id={`${id}_internal_source`}
        className={css.invisibleSource}
      />
      <div
        style={{
          width,
          height,
        }}
        className={css.main}
      >
        <Plus color="white" onClick={() => {}} className={css.icon} />
      </div>
      {/**
       * @TODO Add support for orientation
       */}
      <Handle
        position={sourcePosition}
        type="target"
        id={`${id}_internal_target`}
        className={css.invisibleTarget}
      />
      <Handle
        position={sourcePosition}
        type="source"
        id={`${id}_source`}
        className={css.invisibleSource}
      />
      {enableDiagnostics?.Node && (
        <span className={css.diagnose}>
          ({xPos.toFixed(1)},{yPos.toFixed(1)})
        </span>
      )}
    </>
  );
}
