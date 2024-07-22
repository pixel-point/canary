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
import { DefaultNodeProps, Node } from '../../components/Canvas/types'

export const Studio: React.FC<{}> = () => {
  const [nodes, setNodes] = useState<Node[]>(singleStage)

  return (
    <PipelineStudio
      graph={{ nodes }}
      onAddNode={(addedNode: ReactFlowNode) => {
        /* Sample implementation to add a step to a stage */
        const nodeData = addedNode.data as DefaultNodeProps
        set(nodes[0], 'children', [
          ...(nodes[0].children || []),
          { name: nodeData.name, icon: nodeData.icon, path: '', deletable: true }
        ])
        setNodes((existingNode: Node[]) => [...existingNode])
      }}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioParallel: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={{ nodes: mockNodesParallel as any }}
      onAddNode={() => {}}
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
