import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { PipelineStudio } from '../components/PipelineStudio/PipelineStudio'
import pipelineYamlSingleStage from '../assets/mockPipelines/yamls/pipeline_w_single_stage.yaml'
import pipelineYamlParallelGroup from '../assets/mockPipelines/yamls/pipeline_w_parallel_stage_group.yaml'
import { getGraphFromPipelineYaml } from '../utils/PipelineYamlUtils'

export default {
  title: 'Unified Pipeline/Screens/Pipeline Studio',
  component: PipelineStudio,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    readonly: { control: 'boolean' },
    graph: { table: { disable: true } },
    onAddNode: { table: { disable: true } },
    onDeleteNode: { table: { disable: true } },
    onSelectNode: { table: { disable: true } }
  }
} as Meta

interface StoryProps {
  readonly?: boolean
}

const Template: StoryFn<StoryProps> = args => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PipelineStudio
        graph={getGraphFromPipelineYaml(pipelineYamlSingleStage)}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={() => {}}
        readonly={args.readonly}
      />
    </div>
  )
}

export const WithSingleStage = Template.bind({})
WithSingleStage.args = {
  readonly: false
}

export const WithSingleStageReadOnly = Template.bind({})
WithSingleStageReadOnly.args = {
  readonly: true
}

export function WithMultipleStagesInParallel(props: StoryProps): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PipelineStudio
        graph={getGraphFromPipelineYaml(pipelineYamlParallelGroup)}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={() => {}}
        readonly={props.readonly}
      />
    </div>
  )
}

export function WithMultipleStagesInParallelReadOnly(): React.ReactElement {
  return <WithMultipleStagesInParallel readonly />
}
