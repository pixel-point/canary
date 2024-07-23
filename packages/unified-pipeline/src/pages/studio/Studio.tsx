import React from 'react'
import { Node as ReactFlowNode } from 'reactflow'
import { PipelineStudio } from '../../components/PipelineStudio/PipelineStudio'
import pipelineYamlSingleStage from '../../assets/mockPipelines/yamls/pipeline_w_single_stage.yaml'
import pipelineYamlParallelGroup from '../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml'
import pipelineYamlSequentialGroup from '../../assets/mockPipelines/yamls/pipeline_w_sequential_stage_group.yaml'
import pipelineYamlParallelGroupAndStage from '../../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group_and_stage.yaml'
// import demoPipeline from '../../assets/mockPipelines/yamls/demo_pipeline.yaml'
import { getNodesFromPipelineYaml } from '../../utils/PipelineYamlUtils'
import { Footer, Severity } from '../../../../../apps/storybook/src/composites/footer/footer'

import css from './Studio.module.scss'

export const Studio: React.FC<{}> = () => {
  return (
    <div className={css.main}>
      <PipelineStudio
        nodes={getNodesFromPipelineYaml(pipelineYamlSingleStage)}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={() => {}}
      />
      <Footer
        problems={{ [Severity.ERROR]: 5, [Severity.WARNING]: 15, [Severity.INFO]: 25 }}
        commitHistory={{ lastCommittedAt: 1721774796000, lastCommittedBy: 'Olivia Smith' }}
      />
    </div>
  )
}

export const StudioParallel: React.FC<{}> = () => {
  return (
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroup)}
      onAddNode={(_addedNode: ReactFlowNode) => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioMixed: React.FC<{}> = () => {
  return (
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroupAndStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}

export const StudioDemo: React.FC<{}> = () => {
  return (
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlSequentialGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  )
}
