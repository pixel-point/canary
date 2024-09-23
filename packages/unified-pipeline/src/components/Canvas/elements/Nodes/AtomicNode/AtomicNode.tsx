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
import { useInteractionContext } from '../../../../../framework/InteractionContext/InteractionContext'

export interface AtomicNodeProps extends DefaultNodeProps, ExpandNodeProps, DeleteNodeProps {
  /**
   * @TODO add optional custom renderer props later
   */
}

export default function AtomicNode({ isConnectable, data, id, xPos, yPos, zIndex }: NodeProps<AtomicNodeProps>) {
  const { deleteElements, getEdges, addNodes } = useReactFlow()
  const { handleAddClick, selectedNodePath } = useInteractionContext()
  const { icon, name, readonly, groupId, path } = data
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
            'border p-px rounded-md bg-studio-primary border-studio-4/[0.6] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.3)]',
            { 'gradient-border-gray': status === Status.DONE },
            { 'border-studio-node-selected': selectedNodePath === path }
          )}>
          <div
            style={{
              width,
              height
            }}
            className="content-layer p-2.5 rounded-md">
            {icon}
            <Text className="text-[11px] text-white font-normal leading-4">{name}</Text>
            {enableDiagnostics?.Node && (
              <span className="text-tiny text-red">{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>
            )}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable}>
        {status !== Status.QUEUED && (
          <div
            className="hover:cursor-pointer w-8 h-8 -translate-x-4 -translate-y-4 flex items-center justify-center"
            onClick={e => {
              e.stopPropagation()
              handleAddClick(data)
            }}>
            <Plus
              className={cx(
                'rounded-full w-8 h-8 opacity-0 border border-studio-4/[0.6] hover:border-studio-4 bg-studio-1 text-studio-7 transform translate-x-[2px] translate-y-[2px]',
                {
                  'transition-opacity duration-200 ease-in-out opacity-100': showPlus
                }
              )}
            />
          </div>
        )}
      </Handle>
    </div>
  )
}
