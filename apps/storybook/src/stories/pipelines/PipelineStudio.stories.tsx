import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { PipelineStudio, getNodesFromPipelineYaml } from '@harnessio/unified-pipeline'
import pipelineYamlSingleStage from './pipeline_w_single_stage.yaml'
import pipelineYamlParallelGroup from './pipeline_w_parallel_stage_group.yaml'

const meta: Meta<typeof PipelineStudio> = {
  title: 'Unified Pipeline/Pipeline Studio',
  component: PipelineStudio,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    readonly: { control: 'boolean' },
    nodes: { table: { disable: true } },
    onAddNode: { table: { disable: true } },
    onDeleteNode: { table: { disable: true } },
    onSelectNode: { table: { disable: true } }
  }
}

export default meta

const TemplateSingleStage: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlSingleStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const WithSingleStageReadOnly: StoryFn = () => <TemplateSingleStage readonly />

const TemplateMultipleStagesParallel: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const WithStageGroupWithMultipleStages: StoryFn = () => <TemplateMultipleStagesParallel readonly />
