import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { PlaySolid } from 'iconoir-react'
import { DefaultNodeProps, ExpandNodeProps } from '../../../types'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import { getNodeDiagnostics } from '../../../../../components/Canvas/utils/NodeUtils'

import css from './RootNode.module.scss'

export interface RootNodeProps extends Omit<DefaultNodeProps, 'targetPostion'>, ExpandNodeProps {}

export default function RootNode({ data, xPos, yPos, zIndex }: NodeProps<RootNodeProps>) {
  const { enableDiagnostics } = useCanvasStore()
  const { sourcePosition = Position.Right } = data
  return (
    <>
      <div className={css.main}>
        <PlaySolid color="green" className={css.icon} />
      </div>
      <Handle position={sourcePosition} type="source" />
      {enableDiagnostics?.Node && <span className={css.diagnose}>{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>}
    </>
  )
}
