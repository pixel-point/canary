import React from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import { capitalize } from 'lodash-es'
import { Plus } from 'iconoir-react'
import type { DefaultNodeProps } from '../../../types'
import { DEFAULT_NODE_LOCATION } from '../../../utils/LROrientation/Constants'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import { getNodeDiagnostics } from '../../../../../components/Canvas/utils/NodeUtils'

import css from './PlusNode.module.scss'

export interface PlusNodeProps extends DefaultNodeProps {}

export default function PlusNode({ data, xPos, yPos, zIndex }: NodeProps<PlusNodeProps>) {
  const { entityType, nodeType, targetPosition = Position.Left } = data
  const { getNodes, setNodes } = useReactFlow()
  const { enableDiagnostics } = useCanvasStore()

  const addNewNode = (event: React.MouseEvent): void => {
    event.preventDefault()
    event.stopPropagation()

    const existingNodes = getNodes()
    const relevantNodes = existingNodes.filter(node => node.type === nodeType)
    const nodeCount = relevantNodes.length
    const newNodeId = `${entityType}_${nodeCount + 1}`
    const newNodeName = capitalize(`${entityType} ${nodeCount + 1}`)
    const newNode = {
      id: newNodeId,
      position: {
        ...DEFAULT_NODE_LOCATION,
        y: yPos
      },
      data: { ...data, name: newNodeName },
      type: nodeType
    }
    const updatedNodes = [...existingNodes, newNode]
    setNodes(updatedNodes)
  }

  return (
    <>
      <Handle position={targetPosition} type="target" />
      <div className={css.main}>
        <Plus onClick={addNewNode} className={css.icon} />
      </div>
      {enableDiagnostics?.Node && <span className={css.diagnose}>{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>}
    </>
  )
}
