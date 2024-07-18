import React, { FC } from "react";
import { EdgeProps, getSmoothStepPath } from "reactflow";

const CustomSmoothStepEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g className="react-flow__edge">
      <path
        id={id}
        style={{ stroke: "#ff0072", strokeWidth: 2, ...style }} // Custom styles
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text>
        <textPath
          href={`#${id}`}
          startOffset="50%"
          textAnchor="middle"
          style={{ fill: "black", fontSize: 12 }}
        >
          Custom Edge
        </textPath>
      </text>
    </g>
  );
};

export default CustomSmoothStepEdge;
