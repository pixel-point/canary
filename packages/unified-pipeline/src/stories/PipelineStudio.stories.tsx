import React from 'react'
import { PipelineStudio } from '../components/PipelineStudio/PipelineStudio'
import { nodes as singleStage } from '../pages/studio/mock_single'
import { nodes as multiStagesParallel } from '../pages/studio/mock_parallel'

export default {
  title: 'Unified Pipeline/Pages/Pipeline Studio',
  parameters: {
    layout: 'fullscreen'
  }
}

interface StoryProps {
  readonly?: boolean
}

export function WithSingleStage(props: StoryProps): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PipelineStudio
        graph={{ nodes: singleStage as any }}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={() => {}}
        readonly={props.readonly}
      />
    </div>
  )
}

export function WithSingleStageReadOnly(): React.ReactElement {
  return <WithSingleStage readonly />
}

export function WithMultipleStagesInParallel(props: StoryProps): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PipelineStudio
        graph={{ nodes: multiStagesParallel as any }}
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
