import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import type { NodeProps } from 'reactflow'
import { Handle, Position, useReactFlow, Node } from 'reactflow'
import { Plus, Computer } from 'iconoir-react'
import {
  PositionType,
  type DefaultNodeProps,
  type DeleteNodeProps,
  type ExpandNodeProps,
  NodeType
} from '../../../types'
import { fetchNodeConnections, getNodeDiagnostics } from '../../../utils/NodeUtils'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import Hamburger from '../../../../../icons/Hamburger'
import { STEP_NODE_HEIGHT, STEP_NODE_WIDTH } from '../../../utils/LROrientation/Constants'
import { Status } from '../../../../../utils/Constants'
import cardBg from '../../../../../assets/card-glow.svg'
import { DEFAULT_NODE_LOCATION } from '../../../../../components/Canvas/utils/LROrientation/Constants'

import css from './AtomicNode.module.scss'

const Statuses = [Status.QUEUED, Status.IN_PROGRESS, Status.DONE]

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
  /* To simulate transitions */
  // const [status, setStatus] = useState(Status.QUEUED);
  // const runTransitions = true;
  const [status, setStatus] = useState(Status.DONE)
  const runTransitions = false
  const [showPlus, setShowPlus] = useState<boolean>(false)

  useEffect(() => {
    if (runTransitions) {
      let index = 0
      const updateValue = () => {
        index = (index + 1) % Statuses.length
        setStatus(Statuses[index])
      }
      const randomDelay = Math.floor(Math.random() * 4000) + 5000
      const interval = setInterval(updateValue, randomDelay)
      return () => clearInterval(interval)
    }
  }, [])

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
          <img src={cardBg} className={css.glow} width="192" height="132" alt="" />
          <div
            className={cx(
              css.main,
              /* gradient */
              css.gradientBorder,
              css.gradientBorderGlow
            )}>
            <div
              style={{
                width,
                height
              }}
              className={css.contentLayer}>
              <div className={cx(css.skeletonSquare, css.skeletonIcon)} />
              <div className={cx(css.skeletonLine, css.skeletonLine1)} />
              <div className={cx(css.skeletonLine, css.skeletonLine2)} />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cx(
            css.main,
            /* gradient */
            css.gradientBorder,
            { [css.gradientBorderGray]: status === Status.DONE }
          )}>
          <div
            style={{
              width,
              height
            }}
            className={css.contentLayer}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {icon}
              <Hamburger
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  handleNodeDelete(id)
                }}
                className={css.icon}
              />
            </div>
            <div className={css.marginTop}></div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className={css.label}>{name}</span>
            </div>
            {enableDiagnostics?.Node && (
              <span className={css.diagnose}>{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>
            )}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable}>
        <Plus className={cx(css.icon, css.plus, { [css.show]: showPlus })} onClick={() => addChildNode()} />
      </Handle>
    </div>
  )
}
