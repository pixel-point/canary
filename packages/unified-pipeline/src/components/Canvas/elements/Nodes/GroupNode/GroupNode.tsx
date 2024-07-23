import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { Handle, Position, type NodeProps, Node, useReactFlow } from 'reactflow'
import { set } from 'lodash-es'
import { Computer, Plus } from 'iconoir-react'
import useFlowStore from '../../../../../framework/FlowStore/FlowStore'
import {
  DefaultNodeProps,
  DeleteNodeProps,
  ExpandNodeProps,
  GroupNodesProps,
  GroupOrientation,
  NodeType,
  PositionType
} from '../../../types'
import Expand from '../../../../../icons/Expand'
// import Hamburger from '../../../../../icons/Hamburger'
// import { Menubar } from '../../../../../../../canary/src/components/menubar'
import {
  getChildNodes,
  getNodeById,
  isContainerNode,
  isParentOfNode,
  updateNodePositionType,
  getStageGroupNodeDimensions,
  getGroupNodeOrientation,
  getNodeDiagnostics
} from '../../../utils/NodeUtils'
import { performLayout } from '../../../utils/LayoutUtils'
import { dedupeEdges, getEdgesForChildNodes, mergeEdges } from '../../../utils/EdgeUtils'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import { DEFAULT_NODE_LOCATION } from '../../../../../components/Canvas/utils/LROrientation/Constants'
import { getIdFromName } from '../../../../../utils/StringUtils'

import css from './GroupNode.module.scss'

export interface GroupNodeProps extends DefaultNodeProps, ExpandNodeProps, DeleteNodeProps, GroupNodesProps {}

export default function GroupNode(props: NodeProps<GroupNodeProps>) {
  const { nodes, edges, addEdges, updateNodes } = useFlowStore()
  const { addNodes } = useReactFlow()
  const { enableDiagnostics } = useCanvasStore()
  const { data, id: nodeId, xPos, yPos, zIndex } = props
  const { expanded = true, name, memberNodes = [], parallel, readonly, groupId } = data
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [orientation, setOrientation] = useState<GroupOrientation>(GroupOrientation.LR)
  const [showPlusNode, setShowPlusNode] = useState<boolean>(false)
  const memberNodeCount = memberNodes.length

  useEffect(() => {
    setupNode()
  }, [memberNodeCount])

  const setupNode = useCallback((): void => {
    if (nodes.length === 0 || memberNodeCount === 0) return
    const groupNodeOrientation = getGroupNodeOrientation(memberNodes)
    setOrientation(groupNodeOrientation)
    const { width, height } = getStageGroupNodeDimensions({
      isExpanded,
      childNodes: memberNodes,
      orientation: groupNodeOrientation
    })
    /**
     * Compute edges
     */
    const parentNode = getNodeById(nodes, nodeId)
    if (!parentNode) return
    const childNodeEdges = getEdgesForChildNodes({
      parentNode,
      nodes
    })
    /**
     * Layout child nodes
     */
    const childNodes = getChildNodes(nodeId, nodes).map(child => updateNodePositionType(child, PositionType.RELATIVE))
    const layoutedElements = performLayout({
      nodes: [parallel ? updateNodePositionType(parentNode, PositionType.ABSOLUTE) : parentNode, ...childNodes],
      edges: childNodeEdges,
      width,
      height,
      readonly
    })
    updateNodes(layoutedElements.nodes)
    addEdges(dedupeEdges(mergeEdges(edges, layoutedElements.edges)))
    setWidth(width)
    setHeight(height)
  }, [memberNodes, memberNodeCount, isExpanded, nodes, edges, nodeId, parallel])

  /* Required to control recursive collapse and expand */
  const shouldUpdateChildNode = (parentNodeId: string, childNode: Node) => {
    return (
      isParentOfNode(parentNodeId, childNode) &&
      [NodeType.STAGE, NodeType.ATOMIC, NodeType.ANCHOR].includes(childNode.type as NodeType)
    )
  }

  const updateNodeDimensions = (node: Node, isExpanded: boolean): void => {
    const { width, height } = getStageGroupNodeDimensions({
      isExpanded,
      childNodes: memberNodes,
      orientation
    })
    set(node, 'width', width)
    set(node, 'height', height)
    setWidth(width)
    setHeight(height)
  }

  /*
   * Show nodes
   */
  const handleNodeExpand = useCallback(
    (expandedNodeId: string): void => {
      const expandNode = (nodeId: string, updatedNodes: Node[]): Node[] => {
        const parentNode = nodes.find(node => node.id === nodeId)
        if (!parentNode) return updatedNodes
        set(parentNode, 'data.expanded', true)
        updateNodeDimensions(parentNode, true)
        updatedNodes.push(parentNode)
        const childNodes = getChildNodes(nodeId, nodes).map(node => {
          if (shouldUpdateChildNode(nodeId, node)) {
            set(node, 'hidden', false)
            // Recursively expand child nodes
            if (isContainerNode(node)) {
              updatedNodes = expandNode(node.id, updatedNodes)
            }
          }
          return node
        })
        return updatedNodes.concat(childNodes)
      }
      const updatedNodes = expandNode(expandedNodeId, [])
      updateNodes(updatedNodes)
    },
    [nodes, edges]
  )

  /*
   * Hide nodes
   */
  const handleNodeCollapse = useCallback(
    (collapsedNodeId: string): void => {
      const collapseNode = (nodeId: string, updatedNodes: Node[]): Node[] => {
        const parentNode = nodes.find(node => node.id === nodeId)
        if (!parentNode) return updatedNodes
        set(parentNode, 'data.expanded', false)
        updateNodeDimensions(parentNode, false)
        updatedNodes.push(parentNode)
        const childNodes = getChildNodes(nodeId, nodes).map(node => {
          if (shouldUpdateChildNode(nodeId, node)) {
            set(node, 'hidden', true)
            // Recursively collapse child nodes
            if (isContainerNode(node)) {
              updatedNodes = collapseNode(node.id, updatedNodes)
            }
          }
          return node
        })
        return updatedNodes.concat(childNodes)
      }
      const updatedNodes = collapseNode(collapsedNodeId, [])
      updateNodes(updatedNodes)
    },
    [nodes, edges]
  )

  const handleNodeExpandCollapse = useCallback((): void => {
    setIsExpanded((expanded: boolean) => {
      const isExpanded = !expanded
      if (isExpanded) {
        handleNodeExpand(nodeId)
      } else {
        handleNodeCollapse(nodeId)
      }
      return isExpanded
    })
  }, [nodes, edges, nodeId])

  const addChildNode = useCallback((): void => {
    const name = `New stage ${memberNodeCount}`
    const newNode: Node = {
      id: getIdFromName(name),
      data: {
        name,
        icon: <Computer />,
        path: '',
        positionType: PositionType.RELATIVE,
        expandable: true,
        expanded: false,
        deletable: true,
        readonly,
        parallel: orientation === GroupOrientation.TB
      } as GroupNodeProps,
      position: DEFAULT_NODE_LOCATION,
      type: NodeType.STAGE,
      selectable: true,
      parentNode: groupId,
      extent: 'parent',
      zIndex
    }
    addNodes([newNode])
  }, [readonly, zIndex, nodes, parallel, groupId, orientation, memberNodeCount])

  return (
    <div onMouseEnter={() => setShowPlusNode(true)} onMouseLeave={() => setShowPlusNode(false)}>
      {/**
       * @TODO Add support for orientation
       */}
      <Handle position={Position.Left} type="target" id={`${nodeId}_target`} />
      <Handle position={Position.Left} type="source" id={`${nodeId}_internal_source`} />
      <div
        style={{
          width,
          height
        }}
        className={cx(css.main, { [css.collapsed]: !isExpanded })}>
        <div className={css.tools}>
          <div className={css.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Expand
                onClick={(event: any) => {
                  event.preventDefault()
                  event.stopPropagation()
                  handleNodeExpandCollapse()
                }}
                className={cx(css.icon, css.hover)}
              />
              &nbsp;
              <span className={css.label}>{name}</span>
              {memberNodeCount > 0 && <span className={css.count}>&nbsp;({memberNodeCount})</span>}
            </div>
          </div>
          {/* <Menubar
            trigger={<Hamburger color="white" />}
            options={[
              {
                label: 'Delete',
                onClick: () => {}
              }
            ]}
            className={css.hover}
          /> */}
        </div>
        <Plus
          onClick={() => addChildNode()}
          className={cx(css.plus, css.hover, {
            [css.show]: showPlusNode && !readonly && isExpanded && orientation === GroupOrientation.TB
          })}
        />
      </div>
      {/**
       * @TODO Add support for orientation
       */}
      <Handle position={Position.Right} type="target" id={`${nodeId}_internal_target`} />
      <Handle position={Position.Right} type="source" id={`${nodeId}_source`} />
      {enableDiagnostics?.Node && <span className={css.diagnose}>{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>}
    </div>
  )
}
