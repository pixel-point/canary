import React, { useCallback, useLayoutEffect, useState } from 'react'
import cx from 'classnames'
import ReactFlow, {
  Controls,
  ReactFlowProvider,
  Node,
  Edge,
  applyNodeChanges,
  OnNodesChange,
  NodeMouseHandler,
  EdgeMouseHandler,
  OnEdgesChange,
  applyEdgeChanges,
  ControlButton,
  useReactFlow
} from 'reactflow'
import { Circle, Minus } from 'iconoir-react'
import { defaultEdgeMarkerOptions } from './nodes-edges-defaults'
import { EdgeTypes, NodeTypes } from './types'
import { CanvasEntity, useCanvasStore } from '../../framework/CanvasStore/CanvasStoreContext'
import useFlowStore from '../../framework/FlowStore/FlowStore'
import { performElkLayout, elkOptions } from './utils/ElkLayout'
import { partitionNodesForLayout } from './utils/NodeUtils'
// import useAutoLayout from '../../hooks/useAutoLayout'
import CircleOverlay, { Position } from '../../components/CircleOverlay/CircleOverlay'

import 'reactflow/dist/style.css'
import css from './Canvas.module.scss'

export const initialEdges = []

const ANIMATION_DURATION = 400

interface CanvasLayoutProps {
  height: number
  width: number
}

interface CanvasProps extends CanvasLayoutProps {
  nodes: Node[]
  edges: Edge[]
  onAddNode: (addedNode: Node) => void
  onDeleteNode: (deletedNode: Node) => void
  onSelectNode: (selectedNode: Node) => void
}

const CanvasInternal = (props: CanvasProps) => {
  const { fitView } = useReactFlow()
  const { setEnableDiagnostics, enableDiagnostics } = useCanvasStore()
  const { nodes, edges, setNodes, setEdges, addEdge } = useFlowStore()
  const [mousePosition, setMousePosition] = useState<Position | null>(null)
  const [enableOverlay] = useState<boolean>(false)

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY })
  }

  /**
   * @TODO fix this as it's currently causing an elkjs exception
   */
  // useAutoLayout()

  useLayoutEffect(() => {
    if (props.nodes.length === 0) return
    const { selfLayoutable: parentNodes, dependents: childNodes } = partitionNodesForLayout(props.nodes)
    performElkLayout({
      nodes: parentNodes,
      edges: props.edges,
      options: elkOptions,
      useDynamicSpacing: true
    }).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
      setNodes([...layoutedNodes, ...childNodes])
      setEdges(layoutedEdges)
      window.requestAnimationFrame(() =>
        fitView({
          duration: ANIMATION_DURATION,
          nodes: [{ id: layoutedNodes[1].id }]
        })
      )
    })
  }, [props.nodes, props.edges])

  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node: Node) => {
      event.preventDefault()
      event.stopPropagation()
      props.onSelectNode(node)
      if (enableDiagnostics?.Node) {
        console.log(node)
      }
    },
    [enableDiagnostics?.Node]
  )

  const onEdgeClick: EdgeMouseHandler = useCallback(
    (event, edge: Edge) => {
      event.preventDefault()
      event.stopPropagation()
      if (enableDiagnostics?.Edge) {
        console.log(edge)
      }
    },
    [enableDiagnostics?.Edge]
  )

  const onNodesChange: OnNodesChange = useCallback(
    nodeChanges => {
      const updatedNodes = applyNodeChanges(nodeChanges, nodes)
      const updatedNodeIds = updatedNodes.map(node => node.id)
      const existingNodeIds = nodes.map(node => node.id)
      if (updatedNodes.length > nodes.length) {
        const addedNode = updatedNodes.find(node => !existingNodeIds.includes(node.id))
        if (addedNode) {
          props.onAddNode(addedNode)
        }
      } else if (updatedNodes.length < nodes.length) {
        const deletedNode = nodes.find(node => !updatedNodeIds.includes(node.id))
        if (deletedNode) {
          props.onDeleteNode(deletedNode)
        }
      }
    },
    [nodes]
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    edgeChanges => {
      const updatedEdges = applyEdgeChanges(edgeChanges, edges)
      setEdges(updatedEdges)
    },
    [edges]
  )

  const onConnect = useCallback(
    (params: any): void =>
      addEdge({
        ...params,
        markerEnd: defaultEdgeMarkerOptions
      }),
    [setEdges]
  )

  return (
    <div className={cx(css.main, css.canvasContainer)} onMouseMove={handleMouseMove}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NodeTypes}
        edgeTypes={EdgeTypes}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={{ hideAttribution: true }}
        fitView
        minZoom={0.5}
        maxZoom={1}
        onInit={instance =>
          setTimeout(() => window.requestAnimationFrame(() => instance.fitView({ duration: ANIMATION_DURATION })), 0)
        }
        /* https://github.com/xyflow/xyflow/discussions/2827 */
        nodeOrigin={[0.5, 0.5]}
        className={css.canvas}>
        <Controls>
          <ControlButton
            onClick={() =>
              setEnableDiagnostics(diagnostics => {
                return {
                  ...diagnostics,
                  [CanvasEntity.Node]: !diagnostics.Node
                }
              })
            }>
            <Circle />
          </ControlButton>
          <ControlButton
            onClick={() =>
              setEnableDiagnostics(diagnostics => {
                return {
                  ...diagnostics,
                  [CanvasEntity.Edge]: !diagnostics.Edge
                }
              })
            }>
            <Minus />
          </ControlButton>
        </Controls>
      </ReactFlow>
      {enableOverlay && mousePosition && <CircleOverlay position={mousePosition} />}
    </div>
  )
}

export function Canvas(props: CanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInternal {...props} />
    </ReactFlowProvider>
  )
}
