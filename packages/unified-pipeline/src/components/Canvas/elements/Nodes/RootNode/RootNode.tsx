import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { Icon } from '@harnessio/canary'
import { DefaultNodeProps, ExpandNodeProps } from '../../../types'
import { useCanvasStore } from '../../../../../framework/CanvasStore/CanvasStoreContext'
import { getNodeDiagnostics } from '../../../../../components/Canvas/utils/NodeUtils'

export interface RootNodeProps extends Omit<DefaultNodeProps, 'targetPostion'>, ExpandNodeProps {}

export default function RootNode({ data, xPos, yPos, zIndex }: NodeProps<RootNodeProps>) {
  const { enableDiagnostics } = useCanvasStore()
  const { sourcePosition = Position.Right } = data
  return (
    <>
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-studio-1">
        <Icon name="play" className="hover:cursor-pointer text-success" />
      </div>
      <Handle position={sourcePosition} type="source" />
      {enableDiagnostics?.Node && (
        <span className="text-red text-sm">{getNodeDiagnostics({ xPos, yPos, zIndex })}</span>
      )}
    </>
  )
}
