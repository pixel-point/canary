import React from 'react'
import { PipelineStudio } from '../components/PipelineStudio/PipelineStudio'
import { mockNodes } from '../pages/studio/mock_single'

export default {
  title: 'Unified Pipeline/Pages/Pipeline Studio',
  parameters: {
    layout: 'fullscreen'
  }
}

export function WithSingleStage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <PipelineStudio
        graph={{ nodes: mockNodes as any }}
        onAddNode={() => {}}
        onDeleteNode={() => {}}
        onSelectNode={() => {}}
      />
    </div>
  )
}
