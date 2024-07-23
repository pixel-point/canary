import React, { useState } from 'react'
import { get, set } from 'lodash-es'
import { Node as ReactFlowNode } from 'reactflow'
import { PipelineStudio } from '../../components/PipelineStudio/PipelineStudio'
import pipelineYamlSingleStage from '../../assets/mockPipelines/yamls/pipeline_w_single_stage.yaml'
import pipelineYamlParallelGroup from '../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml'
import pipelineYamlParallelGroupAndStage from '../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group_and_stage.yaml'
import demoPipeline from '../../assets/mockPipelines/yamls/demo_pipeline.yaml'
import { getGraphFromPipelineYaml } from '../../utils/PipelineYamlUtils'
import { DefaultNodeProps, DeleteNodeProps, GroupNodesProps } from '../../components/Canvas/types'

export const Studio: React.FC<{}> = () => {
  const [nodes, setNodes] = useState<Node[]>([])

  return (
    <PipelineStudio
      graph={getGraphFromPipelineYaml(pipelineYamlSingleStage)}
      onAddNode={(addedNode: ReactFlowNode) => {
        /* Sample implementation to add a step to a stage */
        const nodeData = addedNode.data
        set(nodes[0], 'children', [
          ...get(nodes[0], 'children', []),
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
  const [nodes, setNodes] = useState<Node[]>([])
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYaml(pipelineYamlParallelGroup)}
      onAddNode={(addedNode: ReactFlowNode) => {
        /* Sample implementation to add a step to a stage */
        const nodeData = addedNode.data
        set(nodes[0], 'children', [
          ...get(nodes[0], 'children', []),
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
      graph={getGraphFromPipelineYaml(pipelineYamlParallelGroupAndStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioDemo: React.FC<{}> = () => {
  return (
    <PipelineStudio
      graph={getGraphFromPipelineYaml(demoPipeline)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}
