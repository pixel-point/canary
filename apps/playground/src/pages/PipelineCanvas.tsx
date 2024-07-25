import React from 'react'
import { Studio } from '../../../../packages/unified-pipeline/src/pages/studio/Studio'

export const PipelineCanvas: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Studio />
    </div>
  )
}
