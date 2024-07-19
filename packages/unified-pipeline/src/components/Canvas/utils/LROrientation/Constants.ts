import { XYPosition } from "reactflow";

export const NODE_DEFAULT_WIDTH = 250;
export const NODE_DEFAULT_HEIGHT = 50;

/* Inter node */
export const NODE_HORIZONTAL_MARGIN = 25;
export const NODE_HORIZONTAL_MARGIN_2 = 2 * NODE_HORIZONTAL_MARGIN;
export const NODE_VERTICAL_MARGIN = 25;
export const INTER_PARENT_NODE_NODE_HORIZONTAL_SEPARATION_READ_ONLY =
  2 * NODE_VERTICAL_MARGIN;
export const INTER_PARENT_NODE_NODE_HORIZONTAL_SEPARATION =
  INTER_PARENT_NODE_NODE_HORIZONTAL_SEPARATION_READ_ONLY + 10;
export const INTER_PARENT_PARENT_HORIZONTAL_SEPARATION =
 40

/* Group node */
export const GROUP_NODE_VERTICAL_ALIGNMENT_MARGIN = NODE_VERTICAL_MARGIN;

/* Anchor node constants */
export const ANCHOR_NODE_WIDTH = 20;
export const ANCHOR_NODE_HEIGHT = 20;
export const ANCHOR_NODE_ID = "anchor";

/* Step node constants */
export const STEP_NODE_WIDTH = 140;
export const STEP_NODE_HEIGHT = 80;

export const DEFAULT_NODE_LOCATION: XYPosition = { x: 0, y: 0 };

/* Root node constants */
export const ROOT_NODE_ID = "root";
export const ROOT_NODE_WIDTH = 40;
export const ROOT_NODE_HEIGHT = 40;

/* Plus node constants */
export const PLUS_NODE_ID = "plus";
export const PLUS_NODE_WIDTH = 20;
export const PLUS_NODE_HEIGHT = 20;
