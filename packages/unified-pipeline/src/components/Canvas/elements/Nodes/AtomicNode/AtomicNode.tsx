import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import type { NodeProps } from 'reactflow'
import { Handle, Position, useReactFlow, Node } from 'reactflow'
import { Plus, Computer } from '@harnessio/icons-noir'
import { Skeleton, Text } from '@harnessio/canary'
import {
  PositionType,
  type DefaultNodeProps,
  type DeleteNodeProps,
  type ExpandNodeProps,
  NodeType
} from '../../../types'
import { fetchNodeConnections, getNodeDiagnostics } from '../../../utils/NodeUtils'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import { STEP_NODE_HEIGHT, STEP_NODE_WIDTH } from '../../../utils/LROrientation/Constants'
import { Status } from '../../../../../utils/Constants'
// import cardBg from '../../../../../assets/images/card-glow.svg'
import { DEFAULT_NODE_LOCATION } from '../../../../../components/Canvas/utils/LROrientation/Constants'

export interface AtomicNodeProps extends DefaultNodeProps, ExpandNodeProps, DeleteNodeProps {
  /**
   * @TODO add optional custom renderer props later
   */
}

export default function AtomicNode({ isConnectable, data, id, xPos, yPos, zIndex }: NodeProps<AtomicNodeProps>) {
  const { deleteElements, getEdges, addNodes } = useReactFlow()
  const { icon, name, readonly, groupId } = data
  const { enableDiagnostics } = useCanvasStore()
  const [width] = useState<number>(STEP_NODE_WIDTH)
  const [height] = useState<number>(STEP_NODE_HEIGHT)
  const [status] = useState(Status.DONE)
  const [showPlus, setShowPlus] = useState<boolean>(false)

  const handleNodeDelete = useCallback(
    (nodeId: string) => {
      deleteElements({ nodes: [{ id: nodeId }] })
      const [edge1, edge2, ..._rest] = fetchNodeConnections(nodeId, getEdges())
      const edgeIdsToDelete = []
      if (edge1) {
        edgeIdsToDelete.push({ id: edge1.id })
      }
      if (edge2) {
        edgeIdsToDelete.push({ id: edge2.id })
      }
      deleteElements({ edges: edgeIdsToDelete })
    },
    [deleteElements]
  )

  const addChildNode = useCallback((): void => {
    const newNode: Node = {
      id: 'new_node',
      data: {
        name: 'New node',
        icon: <Computer />,
        path: '',
        expandable: true,
        positionType: PositionType.RELATIVE,
        deletable: true,
        readonly
      } as AtomicNodeProps,
      position: DEFAULT_NODE_LOCATION,
      type: NodeType.ATOMIC,
      selectable: true,
      parentNode: groupId,
      extent: 'parent',
      zIndex
    }
    addNodes([newNode])
  }, [readonly, zIndex, groupId])

  return (
    <div onMouseEnter={() => setShowPlus(true)} onMouseLeave={() => setShowPlus(false)}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      {status === Status.QUEUED ? (
        <div>
          <div className="border p-px rounded-md gradient-border-glow">
            <div
              style={{
                width,
                height
              }}
              className="content-layer p-2.5 rounded-md">
              <div className="flex flex-col gap-3">
                <Skeleton className="w-6 h-6" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-[115px] h-[5px]" />
                  <Skeleton className="w-[79px] h-[5px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cx(
            'border p-px rounded-md bg-studio-1 border-[rgba(48,48,54,0.6)] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.3)]',
            { 'gradient-border-gray': status === Status.DONE }
          )}>
          <div
            style={{
              width,
              height
            }}
            className="content-layer p-2.5 rounded-md">
            {icon}
            <Text className="text-[11px] text-[rgba(255,255,255,1)] font-normal leading-4">{name}</Text>
            {enableDiagnostics?.Node && (
              <span className="text-tiny text-red">{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>
            )}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable}>
        {status !== Status.QUEUED && (
          <Plus
            className={cx(
              'hover:cursor-pointer',
              'rounded-full w-5 h-5 opacity-0 border border-[rgba(48,48,54,0.6)] bg-[rgba(29,29,32,1)] text-[rgba(228,228,231,1)] transform -translate-x-2 -translate-y-2',
              {
                'transition-opacity duration-200 ease-in-out opacity-100': showPlus
              }
            )}
          />
        )}
      </Handle>
    </div>
  )
}
