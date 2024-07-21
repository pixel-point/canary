import { get, has, isEmpty, isUndefined, set } from 'lodash-es'
import { parse } from 'yaml'
import { type Node as ReactFlowNode, Position, XYPosition } from 'reactflow'
import { NodeType, Graph, Node, PositionType } from '../components/Canvas/types'
import { StageCategory } from '../components/PipelineConfigPanel/types'
import { DEFAULT_NODE_LOCATION, ROOT_NODE_ID, PLUS_NODE_ID } from '../components/Canvas/utils/LROrientation/Constants'
import type { PlusNodeProps } from '../components/Canvas/elements/Nodes/PlusNode/PlusNode'
import type { RootNodeProps } from '../components/Canvas/elements/Nodes/RootNode/RootNode'
import type { AtomicNodeProps } from '../components/Canvas/elements/Nodes/AtomicNode/AtomicNode'
import type { GroupNodeProps } from '../components/Canvas/elements/Nodes/GroupNode/GroupNode'
import { getIdFromName } from './StringUtils'
import { sortNodes } from '../components/Canvas/utils/NodeUtils'

const STAGES_PATH = 'spec.stages'
const STAGES_NODE_PATH_PREFIX = `${STAGES_PATH}.`
const STAGE_STEPS_PATH = 'spec.steps'

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
  connectable: false /* No node other than the one specified should be able to connect to "root" node */
}

const getPlusNode = ({
  pathPrefix,
  targetPosition
}: {
  pathPrefix: string
  targetPosition: Position
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
    connectable: false /* No node other than the one specified should be able to connect to "plus" node */
  }
}

const getGroupNode = ({
  node,
  memberNodes,
  readonly
}: {
  node: Node
  memberNodes: ReactFlowNode[]
  readonly?: boolean
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
  }
}

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
  nodeType: NodeType
  memberNode: Node
  childNodes: ReactFlowNode[]
  pathPrefix: string
  groupId?: string
  position?: XYPosition
  hidden?: boolean
  readonly?: boolean
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
    ...(groupId && { parentNode: groupId, extent: 'parent', zIndex: 1 }),
    hidden
  }
}

const isGroupNode = (node: Node): boolean => {
  return has(node, 'groupId') && !isEmpty(node.groupId) && !isEmpty(node.children)
}

export const getElementsFromGraph = ({ graph, readonly }: { graph: Graph; readonly?: boolean }): ReactFlowNode[] => {
  if (graph.nodes.length === 0) return []
  const nodes: ReactFlowNode[] = [RootNode]
  graph.nodes.forEach((node: Node, nodeIdx: number) => {
    nodes.push(...processNode({ node, nodeIdx, readonly }))
  })
  nodes.push({
    ...getPlusNode({
      pathPrefix: '',
      targetPosition: Position.Left
    }),
    position: DEFAULT_NODE_LOCATION
  })
  return nodes
}

const processNode = ({ node, readonly }: { node: Node; nodeIdx: number; readonly?: boolean }): ReactFlowNode[] => {
  const nodes: ReactFlowNode[] = []
  /* Node is itself a group node */
  if (isGroupNode(node)) {
    const parentNodeId = node.groupId || ''
    const stageNodes: ReactFlowNode[] = []
    const groupChildNodes = node.children
    groupChildNodes?.forEach((groupChildNode: Node, idx: number) => {
      if (isGroupNode(groupChildNode)) {
        // Recursive call for group node child
        const childNodes = processNode({
          node: groupChildNode,
          nodeIdx: idx,
          readonly
        })
        nodes.push(...childNodes)
      } else {
        const hasChildren = groupChildNode.children && groupChildNode.children?.length > 0
        if (hasChildren) {
          const atomicNodes = getAtomicNodesForContainer({
            stageNode: groupChildNode,
            readonly
          })
          const containerNode = getGroupMemberNode({
            nodeType: NodeType.STAGE,
            memberNode: groupChildNode,
            childNodes: atomicNodes,
            groupId: parentNodeId,
            pathPrefix: '',
            position: DEFAULT_NODE_LOCATION,
            readonly
          })
          stageNodes.push(containerNode)
          nodes.push(...[containerNode, ...atomicNodes].sort(sortNodes))
        } else {
          nodes.push(
            getGroupMemberNode({
              nodeType: NodeType.ATOMIC,
              memberNode: groupChildNode,
              childNodes: [],
              pathPrefix: groupChildNode.path,
              readonly
            })
          )
        }
      }
    })
    nodes.push(
      getGroupNode({
        node,
        memberNodes: stageNodes,
        readonly
      })
    )
  } else {
    const hasChildren = node.children && node.children?.length > 0
    if (hasChildren) {
      const atomicNodes = getAtomicNodesForContainer({
        stageNode: node,
        readonly
      })
      const containerNode = getGroupMemberNode({
        nodeType: NodeType.STAGE,
        memberNode: node,
        childNodes: atomicNodes,
        pathPrefix: node.path,
        position: DEFAULT_NODE_LOCATION,
        readonly
      })
      nodes.push(...[containerNode, ...atomicNodes].sort(sortNodes))
    } else {
      nodes.push(
        getGroupMemberNode({
          nodeType: NodeType.ATOMIC,
          memberNode: node,
          childNodes: [],
          pathPrefix: node.path,
          readonly
        })
      )
    }
  }
  return nodes
}

export const getStepNodePath = (stageNodePath: string, stepIndex: number) => `${stageNodePath}.spec.steps.${stepIndex}`

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
  stageNode: Node
  hidden?: boolean
  readonly?: boolean
}): ReactFlowNode[] => {
  if (!stageNode || !stageNode.children) {
    return []
  }
  const parentNodeId = getIdFromName(stageNode.name)
  const childNodes: ReactFlowNode[] = []
  childNodes.push(
    ...(stageNode.children.map((stepNode: Node, stepNodeIdx: number) => {
      const id = getIdFromName(`${stageNode.name} child ${stepNodeIdx + 1}`)
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
        extent: 'parent',
        zIndex: 1,
        hidden
      }
    }) as ReactFlowNode<AtomicNodeProps>[])
  )
  /**
   * Sorting nodes after adding a child node inside a parent is important, see below issue for more details:
   * https://github.com/xyflow/xyflow/issues/3041#issuecomment-1550978610
   */
  return childNodes.sort(sortNodes)
}

const getStageNodes = ({
  yamlObject,
  stageNodesCollection,
  pathPrefix = STAGES_NODE_PATH_PREFIX,
  isParallel
}: {
  yamlObject: Record<string, any>
  stageNodesCollection: Node[]
  pathPrefix?: string
  isParallel?: boolean
}): Node[] => {
  const stages = get(yamlObject, STAGES_PATH, [])
  if (Array.isArray(stages) && stages.length > 0) {
    stages.map((stage: Record<string, any>, stageIdx: number) => {
      const category = get(stage, 'type', '') as StageCategory
      if (category.toLowerCase() === StageCategory.PARALLEL.valueOf().toLowerCase()) {
        const parallelStages = getStageNodes({
          yamlObject: stage,
          stageNodesCollection: [],
          pathPrefix: `${pathPrefix}${stageIdx}.`,
          isParallel: true
        })
        const stageGroup = getStageGroupNode({
          stageGroup: stage,
          stageNodes: parallelStages,
          stageGroupIdx: stageIdx,
          stageGroupNodePathPrefix: `${pathPrefix}${stageIdx}`
        })
        stageNodesCollection.push(stageGroup)
      } else {
        stageNodesCollection.push(
          getStageNode({
            stage,
            stageIdx: stageIdx,
            childNodes: getChildNodes(stage),
            stagePathPrefix: pathPrefix,
            isParallel
          })
        )
      }
    })
  }
  return stageNodesCollection
}

const getStageGroupNode = ({
  stageGroup,
  stageNodes,
  stageGroupIdx,
  stageGroupNodePathPrefix
}: {
  stageGroup: Record<string, any>
  stageNodes: Node[]
  stageGroupIdx: number
  stageGroupNodePathPrefix: string
}): Node => {
  const stepGroupName = get(stageGroup, 'name', `Stage group ${stageGroupIdx}`)
  const stageGroupId = getIdFromName(stepGroupName)
  return {
    name: stepGroupName,
    path: stageGroupNodePathPrefix,
    icon: null,
    children: stageNodes,
    deletable: true,
    expandable: true,
    groupId: stageGroupId
  } as Node
}

const getStageNode = ({
  stage,
  stageIdx,
  childNodes,
  stagePathPrefix,
  isParallel
}: {
  stage: Record<string, any>
  stageIdx: number
  childNodes: Node[]
  stagePathPrefix: string
  isParallel?: boolean
}): Node => {
  return {
    name: get(stage, 'name'),
    path: `${stagePathPrefix}${stageIdx}`,
    icon: null,
    children: childNodes,
    deletable: true,
    expandable: true,
    ...(isParallel && { parallel: isParallel })
  } as Node
}

const getChildNodes = (stage: Record<string, any>): Node[] => {
  const steps = get(stage, STAGE_STEPS_PATH, [])
  let childNodes: Node[] = []
  if (Array.isArray(steps) && steps.length > 0) {
    childNodes = steps.map((step: Record<string, any>, stepIndex: number) => getStepNode(step, stepIndex))
  }
  return childNodes
}

const getStepNode = (step: Record<string, any>, stepIndex: number): Node => {
  return {
    name: get(step, 'name', `step-${stepIndex + 1}`),
    icon: null,
    expandable: false
  } as Node
}

export const getGraphFromPipelineYAML = (pipelineYAML: string): Graph => {
  const pipelineGraphFromYAML: Graph = { nodes: [] }
  if (!pipelineYAML) {
    return pipelineGraphFromYAML
  }
  try {
    const yamlObject = parse(pipelineYAML)
    if (!isUndefined(yamlObject) && !isEmpty(yamlObject)) {
      if (has(yamlObject, STAGES_PATH)) {
        set(pipelineGraphFromYAML, 'nodes', getStageNodes({ yamlObject, stageNodesCollection: [] }))
      }
    }
  } catch (e) {
    // console.error(e)
  }
  return pipelineGraphFromYAML
}
