import React, { useState } from 'react'
import { set } from 'lodash-es'
import { Node as ReactFlowNode } from 'reactflow'
import { PipelineStudio } from '../../components/PipelineStudio/PipelineStudio'
import { nodes as singleStage } from './mock_single'
// import { mockNodes } from "./mock_many";
// import { nodes as multiStagesParallel } from "./mock_multiple";
import { nodes as mockNodesParallel } from './mock_parallel'
import { mockNodes as mockNodesMixed } from './mock_mixed'
import { mockNodes as mockNodesDemo } from './mock_demo'
import { DefaultNodeProps, DeleteNodeProps, GroupNodesProps, Node } from '../../components/Canvas/types'

export const Studio: React.FC<{}> = () => {
  const [nodes, setNodes] = useState<Node[]>(singleStage)

  return (
    <PipelineStudio
      graph={{ nodes }}
      onAddNode={(addedNode: ReactFlowNode) => {
        /* Sample implementation to add a step to a stage */
        const nodeData = addedNode.data
        set(nodes[0], 'children', [
          ...(nodes[0].children || []),
          {
            name: (nodeData as DefaultNodeProps).name,
            icon: (nodeData as DefaultNodeProps).icon,
            path: '',
            deletable: (nodeData as DeleteNodeProps).deletable
          }
        ])
        setNodes((existingNode: Node[]) => [...existingNode])
      }}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioParallel: React.FC<{}> = () => {
  const [nodes, setNodes] = useState<Node[]>(mockNodesParallel)
  return (
    <PipelineStudio
      graph={{ nodes }}
      onAddNode={(addedNode: ReactFlowNode) => {
        /* Sample implementation to add a step to a stage */
        const nodeData = addedNode.data
        set(nodes[0], 'children', [
          ...(nodes[0].children || []),
          {
            name: (nodeData as DefaultNodeProps).name,
            icon: (nodeData as DefaultNodeProps).icon,
            path: '',
            children: (nodeData as GroupNodesProps).memberNodes || [],
            deletable: (nodeData as DeleteNodeProps).deletable,
            parallel: (nodeData as DefaultNodeProps).parallel
          }
        ])
        setNodes((existingNode: Node[]) => [...existingNode])
      }}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioMixed: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesMixed as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioDemo: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesDemo as any }}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}
