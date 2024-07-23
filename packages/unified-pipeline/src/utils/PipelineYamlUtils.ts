import { has, isEmpty, isUndefined, set } from "lodash-es";
import { type Node as ReactFlowNode, Position, XYPosition } from "reactflow";
import {
  NodeType,
  Graph,
  Node,
  PositionType
} from "../components/Canvas/types";
import {
  DEFAULT_NODE_LOCATION,
  ROOT_NODE_ID,
  PLUS_NODE_ID
} from "../components/Canvas/utils/LROrientation/Constants";
import type { PlusNodeProps } from "../components/Canvas/elements/Nodes/PlusNode/PlusNode";
import type { RootNodeProps } from "../components/Canvas/elements/Nodes/RootNode/RootNode";
import type { AtomicNodeProps } from "../components/Canvas/elements/Nodes/AtomicNode/AtomicNode";
import type { GroupNodeProps } from "../components/Canvas/elements/Nodes/GroupNode/GroupNode";
import { getIdFromName } from "./StringUtils";
import {
  getEndAnchorNodeId,
  getStartAnchorNodeId,
  sortNodes
} from "../components/Canvas/utils/NodeUtils";
import { parsePipelineYaml } from "./ParserUtils";

const STAGES_PATH = "stages";
const PIPELINE_STAGES_PATH = `pipeline.${STAGES_PATH}`;

const RootNode: ReactFlowNode = {
  id: ROOT_NODE_ID,
  type: NodeType.ROOT,
  data: {
    expandable: false,
    expanded: true,
    positionType: PositionType.ABSOLUTE
  } as RootNodeProps,
  selectable: false,
  position: DEFAULT_NODE_LOCATION,
  draggable: false,
  connectable:
    false /* No node other than the one specified should be able to connect to "root" node */
};

const getAnchorNode = ({
  id,
  groupId,
  hidden = false
}: {
  id: string;
  groupId: string;
  hidden?: boolean;
}): ReactFlowNode => {
  return {
    id,
    type: NodeType.ANCHOR,
    position: DEFAULT_NODE_LOCATION,
    data: { positionType: PositionType.RELATIVE },
    selectable: true,
    draggable: false,
    connectable: true,
    ...(groupId && {
      parentNode: groupId,
      extent: "parent"
    }),
    hidden
  };
};

const getPlusNode = ({
  pathPrefix,
  targetPosition
}: {
  pathPrefix: string;
  targetPosition: Position;
}): ReactFlowNode => {
  return {
    id: PLUS_NODE_ID,
    type: NodeType.PLUS,
    position: DEFAULT_NODE_LOCATION,
    data: {
      nodeType: NodeType.STAGE,
      positionType: PositionType.ABSOLUTE,
      path: pathPrefix,
      targetPosition
    } as PlusNodeProps,
    selectable: true,
    draggable: false,
    connectable:
      false /* No node other than the one specified should be able to connect to "plus" node */
  };
};

const getGroupNode = ({
  node,
  memberNodes,
  readonly
}: {
  node: Node;
  memberNodes: ReactFlowNode[];
  readonly?: boolean;
}): ReactFlowNode => {
  return {
    id: getIdFromName(node.name),
    data: {
      icon: node.icon,
      name: node.name,
      path: node.path,
      memberNodes,
      positionType: PositionType.ABSOLUTE,
      expandable: node.expandable,
      expanded: true,
      deletable: true,
      parallel: node.parallel,
      groupId: node.groupId,
      readonly
    } as GroupNodeProps,
    position: DEFAULT_NODE_LOCATION,
    type: NodeType.GROUP,
    selectable: true
  };
};

const getGroupMemberNode = ({
  nodeType,
  memberNode,
  childNodes,
  groupId,
  pathPrefix,
  position = DEFAULT_NODE_LOCATION,
  hidden = false,
  readonly
}: {
  nodeType: NodeType;
  memberNode: Node;
  childNodes: ReactFlowNode[];
  pathPrefix: string;
  groupId?: string;
  position?: XYPosition;
  hidden?: boolean;
  readonly?: boolean;
}): ReactFlowNode => {
  return {
    id: getIdFromName(memberNode.name),
    data: {
      icon: memberNode.icon,
      name: memberNode.name,
      path: pathPrefix,
      ...(childNodes.length > 0 && { memberNodes: childNodes }),
      positionType: groupId ? PositionType.RELATIVE : PositionType.ABSOLUTE,
      expandable: memberNode.expandable,
      expanded: true,
      deletable: true,
      parallel: memberNode.parallel,
      readonly
    } as GroupNodeProps,
    position,
    type: nodeType,
    selectable: true,
    connectable: !memberNode.parallel,
    ...(groupId && { parentNode: groupId, extent: "parent", zIndex: 1 }),
    hidden
  };
};

const isGroupNode = (node: Node): boolean => {
  return (
    has(node, "groupId") && !isEmpty(node.groupId) && !isEmpty(node.children)
  );
};

export const getElementsFromGraph = ({
  graph,
  readonly
}: {
  graph: Graph;
  readonly?: boolean;
}): ReactFlowNode[] => {
  if (graph.nodes.length === 0) return [];
  const nodes: ReactFlowNode[] = [RootNode];
  graph.nodes.forEach((node: Node, nodeIdx: number) => {
    nodes.push(...processNode({ node, nodeIdx, readonly }));
  });
  nodes.push({
    ...getPlusNode({
      pathPrefix: "",
      targetPosition: Position.Left
    }),
    position: DEFAULT_NODE_LOCATION
  });
  return nodes;
};

const processNode = ({
  node,
  readonly
}: {
  node: Node;
  nodeIdx: number;
  readonly?: boolean;
}): ReactFlowNode[] => {
  const nodes: ReactFlowNode[] = [];
  /* Node is itself a group node */
  if (isGroupNode(node)) {
    const parentNodeId = node.groupId || "";
    const stageNodes: ReactFlowNode[] = [];
    const groupChildNodes = node.children;
    groupChildNodes?.forEach((groupChildNode: Node, idx: number) => {
      if (isGroupNode(groupChildNode)) {
        // Recursive call for group node child
        const childNodes = processNode({
          node: groupChildNode,
          nodeIdx: idx,
          readonly
        });
        nodes.push(...childNodes);
      } else {
        const hasChildren =
          groupChildNode.children && groupChildNode.children?.length > 0;
        if (hasChildren) {
          const atomicNodes = getAtomicNodesForContainer({
            stageNode: groupChildNode,
            readonly
          });
          const containerNode = getGroupMemberNode({
            nodeType: NodeType.STAGE,
            memberNode: groupChildNode,
            childNodes: atomicNodes,
            groupId: parentNodeId,
            pathPrefix: "",
            position: DEFAULT_NODE_LOCATION,
            readonly
          });
          stageNodes.push(containerNode);
          nodes.push(...[containerNode, ...atomicNodes].sort(sortNodes));
        } else {
          nodes.push(
            getGroupMemberNode({
              nodeType: NodeType.ATOMIC,
              memberNode: groupChildNode,
              childNodes: [],
              pathPrefix: groupChildNode.path,
              readonly
            })
          );
        }
      }
    });
    nodes.push(
      getGroupNode({
        node,
        memberNodes: stageNodes,
        readonly
      })
    );
  } else {
    const hasChildren = node.children && node.children?.length > 0;
    if (hasChildren) {
      const atomicNodes = getAtomicNodesForContainer({
        stageNode: node,
        readonly
      });
      const containerNode = getGroupMemberNode({
        nodeType: NodeType.STAGE,
        memberNode: node,
        childNodes: atomicNodes,
        pathPrefix: node.path,
        position: DEFAULT_NODE_LOCATION,
        readonly
      });
      nodes.push(...[containerNode, ...atomicNodes].sort(sortNodes));
    } else {
      nodes.push(
        getGroupMemberNode({
          nodeType: NodeType.ATOMIC,
          memberNode: node,
          childNodes: [],
          pathPrefix: node.path,
          readonly
        })
      );
    }
  }
  return nodes;
};

export const getStepNodePath = (stageNodePath: string, stepIndex: number) =>
  `${stageNodePath}.spec.steps.${stepIndex}`;

/**
 *
 * @param stageNode
 * @param hidden - To hide children by default. In step group view, stage nodes should be rendered in the collapsed view by default.
 * @returns
 */
export const getAtomicNodesForContainer = ({
  stageNode,
  hidden = false,
  readonly
}: {
  stageNode: Node;
  hidden?: boolean;
  readonly?: boolean;
}): ReactFlowNode[] => {
  if (!stageNode || !stageNode.children) {
    return [];
  }
  const parentNodeId = getIdFromName(stageNode.name);
  const childNodes: ReactFlowNode[] = [];
  if (!readonly) {
    childNodes.push(
      getAnchorNode({
        id: getStartAnchorNodeId(parentNodeId),
        groupId: parentNodeId
        // hidden: true,
      })
    );
  }
  childNodes.push(
    ...(stageNode.children.map((stepNode: Node, stepNodeIdx: number) => {
      const id = getIdFromName(`${stageNode.name} child ${stepNodeIdx + 1}`);
      return {
        id,
        data: {
          name: stepNode.name,
          icon: stepNode.icon,
          path: getStepNodePath(stageNode.path, stepNodeIdx),
          expandable: stepNode.expandable,
          positionType: PositionType.RELATIVE,
          deletable: true,
          readonly
        } as AtomicNodeProps,
        position: DEFAULT_NODE_LOCATION,
        type: NodeType.ATOMIC,
        selectable: true,
        parentNode: parentNodeId,
        extent: "parent",
        zIndex: 1,
        hidden
      };
    }) as ReactFlowNode<AtomicNodeProps>[])
  );
  if (!readonly) {
    childNodes.push(
      getAnchorNode({
        id: getEndAnchorNodeId(parentNodeId),
        groupId: parentNodeId
        // hidden: true,
      })
    );
  }
  /**
   * Sorting nodes after adding a child node inside a parent is important, see below issue for more details:
   * https://github.com/xyflow/xyflow/issues/3041#issuecomment-1550978610
   */
  return childNodes.sort(sortNodes);
};

export const getGraphFromPipelineYAML = (pipelineAsYaml: string): Graph => {
  const pipelineGraphFromYAML: Graph = { nodes: [] };
  if (!pipelineAsYaml) {
    return pipelineGraphFromYAML;
  }
  try {
    if (!isUndefined(pipelineAsYaml) && !isEmpty(pipelineAsYaml)) {
      if (has(pipelineAsYaml, PIPELINE_STAGES_PATH)) {
        set(
          pipelineGraphFromYAML,
          "nodes",
          parsePipelineYaml({
            yamlObject: pipelineAsYaml,
            collectedNodes: []
          })
        );
      }
    }
  } catch (e) {
    // console.error(e)
  }
  return pipelineGraphFromYAML;
};
