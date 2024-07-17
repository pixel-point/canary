import { MarkerType, type EdgeMarkerType } from "reactflow";
import { EdgeType } from "../../components/Canvas/types";

export const defaultEdgeMarkerOptions: EdgeMarkerType = {
  type: MarkerType.Arrow,
  strokeWidth: 2,
  color: "black",
};

export const defaultEdgeOptions = {
  type: EdgeType.CUSTOM,
  markerEnd: defaultEdgeMarkerOptions,
  pathOptions: { offset: 5 },
};
