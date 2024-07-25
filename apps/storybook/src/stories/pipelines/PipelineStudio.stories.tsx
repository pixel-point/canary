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

interface StoryProps {
  readonly?: boolean
}

const Template: StoryFn<StoryProps> = args => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlSingleStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly={args.readonly}
    />
  </div>
)

export const WithSingleStage: StoryFn<StoryProps> = Template.bind({})
WithSingleStage.args = {
  readonly: false
}

export const WithSingleStageReadOnly: StoryFn<StoryProps> = Template.bind({})
WithSingleStageReadOnly.args = {
  readonly: true
}

export const WithMultipleStagesInParallel: StoryFn<StoryProps> = props => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
      readonly={props.readonly}
    />
  </div>
)

export const WithMultipleStagesInParallelReadOnly: StoryFn<StoryProps> = () => <WithMultipleStagesInParallel readonly />
