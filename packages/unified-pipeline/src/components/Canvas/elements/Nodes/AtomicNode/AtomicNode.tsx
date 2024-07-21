import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import type { NodeProps } from 'reactflow'
import { Handle, Position, useReactFlow } from 'reactflow'
import { Plus } from 'iconoir-react'
import type { DefaultNodeProps, DeleteNodeProps, ExpandNodeProps } from '../../../types'
import { fetchNodeConnections } from '../../../utils/NodeUtils'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import Hamburger from '../../../../../icons/Hamburger'
import { STEP_NODE_HEIGHT, STEP_NODE_WIDTH } from '../../../utils/LROrientation/Constants'
import { Status } from '../../../../../utils/Constants'
import cardBg from '../../../../../assets/card-glow.svg'

import css from './AtomicNode.module.scss'

const Statuses = [Status.QUEUED, Status.IN_PROGRESS, Status.DONE]

export interface AtomicNodeProps extends DefaultNodeProps, ExpandNodeProps, DeleteNodeProps {
  /**
   * @TODO add optional custom renderer props later
   */
}

export default function AtomicNode({ isConnectable, data, id, xPos, yPos }: NodeProps<AtomicNodeProps>) {
  const { enableDiagnostics } = useCanvasStore()
  const [width] = useState<number>(STEP_NODE_WIDTH)
  const [height] = useState<number>(STEP_NODE_HEIGHT)
  const { icon, name } = data
  const { deleteElements, getEdges } = useReactFlow()
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
              <span className={css.diagnose}>
                ({xPos.toFixed(1)},{yPos.toFixed(1)})
              </span>
            )}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable}>
        <Plus className={cx(css.icon, css.plus, { [css.show]: showPlus })} />
      </Handle>
    </div>
  )
}
