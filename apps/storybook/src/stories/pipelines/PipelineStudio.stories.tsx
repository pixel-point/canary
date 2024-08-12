import { StoryFn, Meta } from '@storybook/react'
import { PipelineStudio, getNodesFromPipelineYaml } from '@harnessio/unified-pipeline'
import pipelineYamlSingleStage from './pipeline_w_single_stage.yaml'
import pipelineYamlParallelGroup from './pipeline_w_parallel_stage_group.yaml'
import pipelineYamlSequentialGroup from './pipeline_w_sequential_stage_group.yaml'
import pipelineYamlParallelGroupAndStage from './pipeline_w_parallel_stage_group_and_stage.yaml'
import pipelineUnscriptedYaml from './demo_pipeline.yaml'

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

export const SingleStage: StoryFn = () => <TemplateSingleStage readonly />

const TemplateParallelStageGroup: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const ParallelStageGroup: StoryFn = () => <TemplateParallelStageGroup readonly />

const TemplateSequentialStageGroup: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlSequentialGroup)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const SequentialStageGroup: StoryFn = () => <TemplateSequentialStageGroup readonly />

const TemplateParallelStageGroupAndStage: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineYamlParallelGroupAndStage)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const ParallelStageGroupAndStage: StoryFn = () => <TemplateParallelStageGroupAndStage readonly />

const TemplateUnscriptedPipeline: StoryFn = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <PipelineStudio
      nodes={getNodesFromPipelineYaml(pipelineUnscriptedYaml)}
      onAddNode={() => {}}
      onDeleteNode={() => {}}
      onSelectNode={() => {}}
    />
  </div>
)

export const UnscriptedPipeline: StoryFn = () => <TemplateUnscriptedPipeline readonly />
